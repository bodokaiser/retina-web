var os    = require('os');
var fs    = require('fs');
var roo   = require('roo');
var duo   = require('duo');
var babel = require('duo-babel');

var app = roo(__dirname + '/../')
  .use(upload)
  .use(rewrite)
  .bundle(build)
  .bundle('app/index.js')
  .static('srv')
  .compress();

app.listen(3000);

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

function* rewrite(next) {
  if (this.path == '/javascripts/build.js') this.path = '/app/index.js';

  yield next;
}