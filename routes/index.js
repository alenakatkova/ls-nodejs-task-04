const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

const isAdmin = (ctx, next) => {
  if (ctx.session.isAdmin) {
    return next();
  }
  ctx.redirect('/login');
};

router.get('/', ctrlHome.getHome);
router.post('/', koaBody(), ctrlHome.sendEmail);

router.get('/login', ctrlLogin.getLogin);
router.post('/login', koaBody(), ctrlLogin.sendLogin);

router.get('/admin', isAdmin, ctrlAdmin.getAdmin);
router.post('/admin/skills', koaBody(), ctrlAdmin.sendSkills);
router.post('/admin/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: process.cwd() + '/public/upload'
  }
}), ctrlAdmin.uploadGood);

module.exports = router;
