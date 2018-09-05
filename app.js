const Koa = require('koa');
const app = new Koa();
const staticDirectory = require('koa-static');
const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app
});

app.use(staticDirectory('./public'));

const router = require('./routes');

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server start 3000');
});
