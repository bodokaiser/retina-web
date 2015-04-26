import drop  from 'component/drop';
import file  from 'component/file';
import query from 'component/query';

var upload = query('.upload');

drop(upload, function(el) {
  let img = file(el.items[0]);

  console.log(img);

  if (!img.is('image/*')) {
      return alert('Only image uploads possible.');
  }

  img.toDataURL(function(err, str) {
    if (err) throw err;

    upload.classList.remove('empty');
    upload.innerHTML = '<img src="' + str + '">';
  });
});