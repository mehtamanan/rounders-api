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
router.patch('/users/:id', controllers.patchUser);

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
 * GET /leaderboard
 */
router.get('/leaderboard', controllers.getLeaderboard);

/***
 * GET /trending
 */
router.get('/trending', controllers.getArticlesLikedByAllUsers);

/***
 * GET /tags
 */
router.get('/tags', controllers.getTags);

/***
 * GET /users
 */
router.get('/users', controllers.getUsers);

/***
 * GET /users/:id
 */
router.get('/users/:id', controllers.getUser);

module.exports = router;
