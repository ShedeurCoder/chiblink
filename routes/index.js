var express = require('express');
var router = express.Router()
const controller = require('../controllers/controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Chib Link' });
});
router.get('/about', (req, res) => {
  res.render('about', {title: 'About Chib Link'})
})
router.get('/terms-of-service', (req, res) => {
  res.render('tos', {title:'Terms of Service'})
})

// User pages
router.get('/signup', controller.signupGet);
router.post('/signup', controller.signupPost, controller.loginPost);
router.get('/login', controller.loginGet);
router.post('/login', controller.loginPost);
router.get('/logout', controller.logout);
router.get('/edit', controller.checkIfLoggedIn, controller.edit);
router.post('/addlink', controller.addLink);
router.post('/updatelink', controller.updateLink);
router.post('/deletelink', controller.deleteLink);
router.get('/display', controller.checkIfLoggedIn, controller.displaySettingsGet);
router.post('/display', controller.displaySettingsPost);
router.get('/account', controller.checkIfLoggedIn, controller.accountPage);
router.get('/account/*', controller.checkIfLoggedIn);
router.get('/account/email', controller.editEmailGet);
router.get('/account/username', controller.editUsernameGet);
router.get('/account/password', controller.editPasswordGet);
router.post('/account/email', controller.editEmailPost);
router.post('/account/username', controller.editUsernamePost);
router.post('/account/password', controller.editPasswordPost);
router.get('/account/delete', controller.deleteAccountGet);
router.post('/account/delete', controller.deleteAccountLogin, controller.deleteAccountPost);

router.get('/:username', controller.userPage);

module.exports = router;