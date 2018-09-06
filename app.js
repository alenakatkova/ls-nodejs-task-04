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
const fs = require('fs');
const session = require('koa-session');
const config = require('./config');
const errorHandler = require('./libs/error');

app.use(staticDirectory('./public'));

app.use(errorHandler);
app.on('error', (err, ctx) => {
  ctx.render('pages/error', {
    message: ctx.response.message,
    status: ctx.response.status,
    error: ctx.response
  });
});

const router = require('./routes');

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  if (!fs.existsSync('./public/upload')) {
    fs.mkdirSync('./public/upload');
  }

  console.log('Server start 3000');
});
