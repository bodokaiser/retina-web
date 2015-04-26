var os    = require('os');
var fs    = require('fs');
var roo   = require('roo');
var duo   = require('duo');
var babel = require('duo-babel');
var parse = require('raw-body');

var app = roo(__dirname + '/../')
  .use(upload)
  .use(rewrite)
  .bundle(build)
  .bundle('app/index.js')
  .static('srv')
  .compress();

app.listen(3000);

function* upload(next) {
  if (this.path != '/upload') return yield next;

  var src = tmp(), dst = tmp();

  yield write(path, yield parse(this.req));

  this.status = 200;
}

function* rewrite(next) {
  if (this.path == '/javascripts/build.js') this.path = '/app/index.js';

  yield next;
}

function tmp() {
  return os.tmpdir() + Math.random().toString();
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