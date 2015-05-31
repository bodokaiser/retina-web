import drop    from 'component/drop';
import file    from 'component/file';
import query   from 'component/query';
import request from 'visionmedia/superagent';

var upload = query('.upload');
var result = query('.result');

drop(upload, function(el) {
  let img = file(el.items[0]);

  if (!img.is('image/*')) {
      return alert('Only image uploads possible.');
  }

  img.toDataURL(function(err, str) {
    if (err) throw err;

    upload.classList.remove('empty');
    upload.innerHTML = createImg(str);

    request.post('/images')
      .send({
        input: str
      })
      .end(function(err, res) {
        if (err) throw err;

        result.classList.remove('empty');
        result.innerHTML = createImg(res.body.output);
      });
  });
});

function createImg(src) {
  return `<img src="${src}">`;
}
