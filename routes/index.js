const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlHome.getHome);
router.get('/login', ctrlLogin.getLogin);
router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/skills', koaBody(), ctrlAdmin.sendSkills);
router.post('/admin/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: process.cwd() + '/public/upload'
  }
}), ctrlAdmin.uploadGood);

module.exports = router;
