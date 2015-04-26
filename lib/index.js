var koa = require('koa');

var app = koa();

app.use(require('koa-static')(__dirname + '/../srv'));

app.listen(3000);