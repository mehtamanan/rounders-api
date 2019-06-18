let express = require('express');
let controllers = require('../controllers/users');
let router = express.Router();


router.get('/', controllers.userGet);
router.post('/', controllers.userPost);
// router.patch('/', controllers.userPatch);
// router.post('/auth', controllers.userLoginPost);

module.exports = router;
