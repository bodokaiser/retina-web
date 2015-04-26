import drop  from 'component/drop';
import query from 'component/query';

var el = query('.placeholder');

drop(el, function(el) {
  console.log(el);
});