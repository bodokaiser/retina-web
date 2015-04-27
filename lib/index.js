var os    = require('os');
var fs    = require('fs');
var roo   = require('roo');
var duo   = require('duo');
var babel = require('duo-babel');
var parse = require('raw-body');
var child = require('child_process');

var app = roo(__dirname + '/../')
  .use(upload)
  .use(rewrite)
  .bundle(build)
  .bundle('app/index.js')
  .static('srv')
  .compress()
  .bodyparser({
    jsonLimit: '10mb'
  });

app.listen(3000);

function* upload(next) {
  if (this.path != '/upload') return yield next;
  if (!this.request.body.image) return yield next;

  var img, src = tmp(), dst = tmp();

  img = this.request.body.image;
  img = img.substring(img.indexOf(',')+1);

  yield write(src, new Buffer(img, 'base64'));

  child.execFileSync(__dirname + '/../../retina/main.out', [
    src, dst
  ]);

  this.body = {
    image: 'data:image/jpeg;base64,' + fs.readFileSync(dst).toString('base64')
  };
}

function* rewrite(next) {
  if (this.path == '/javascripts/build.js') this.path = '/app/index.js';

  yield next;
}

function tmp() {
  return os.tmpdir() + Math.random().toString() + '.jpg';
}

function write(path, buf) {
  return function(done) {
    fs.writeFile(path, buf, done);
  };
}

function build(file, done) {
  duo(file.root)
    .entry(file.path)
    .use(babel())
    .run(function(err, src) {
      if (err) return done(err);

      file.src = src.code;

      done(null, file);
    });
}