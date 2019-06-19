let express = require('express');

let controllers = require('../controllers');

let router = express.Router();


/***
 * GET /
 * @returns: {JSON} sends a hello message
 */
router.get('/', controllers.hello);

/***
 * POST /users
 */
router.post('/users', controllers.postUser);

/***
 * DELETE /articles/:id
 */
router.delete('/articles/:id', controllers.deleteArticle);

/***
 * PATCH /users/:id
 */
router.patch('/users/:id', controllers.deleteArticle);

/***
 * GET /articles
 */
router.get('/articles', controllers.getArticles);

/***
 * GET /institutions
 */
router.get('/institutions', controllers.getInstitutions);

/***
 * GET /users/:id/articles
 */
router.get('/users/:id/articles', controllers.getArticlesByUser);

/***
 * GET /analytics
 */
router.get('/analytics', controllers.getAnalytics);

/***
 * GET /xxx
 */
router.get('/xxx', controllers.getXXX);

module.exports = router;
