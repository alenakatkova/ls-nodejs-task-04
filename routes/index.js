const Router = require('koa-router');
const router = new Router();

const ctrlHome = require('../controllers/index');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlHome.getHome);
router.get('/login', ctrlLogin.getLogin);
router.get('/admin', ctrlAdmin.getAdmin);

module.exports = router;
