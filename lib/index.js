var roo = require('roo');
var duo = require('duo');

var app = roo(__dirname + '/../')
  .bundle(build)
  .bundle('app/*.{js,css}')
  .static('srv')
  .compress();

app.listen(3000);

function build(file, done) {
  duo(file.root)
    .entry(file.path)
    .run(function(err, src) {
      if (err) return done(err);

      file.src = src.code;

      done(null, file);
    });
}