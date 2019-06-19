
let { getDB } = require("../db");

async function hello(req, res) {
    return res.json({ message: "Hello World" });
}

// INSERT query
async function postUser(req, res) {
    try {
        let db = await getDB();
        let result = await db.result("INSERT INTO users(${this:name}) VALUES(${this:csv})", req.body);

        return res.json({ result: { rowsAffected: result.rowCount, command: result.command } });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// DELETE query
async function deleteArticle(req, res) {
    try {
        let db = await getDB();
        let result = await db.result("DELETE FROM articles WHERE id = $1", req.params.id);

        return res.json({ result: { rowsAffected: result.rowCount, command: result.command } });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// UPDATE query
async function patchUser(req, res) {
    try {
        let db = await getDB();
        let result = await db.result("UPDATE users SET password = $2 WHERE id = $1", [ req.params.id, req.body.password ]);

        return res.json({ result: { rowsAffected: result.rowCount, command: result.command } });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// SELECTION
async function getArticles(req, res) {
    try {
        let db = await getDB();
        let title = req.query.title ? `%${req.query.title}%` : "%";
        let result = await db.query("SELECT a.id, title, content, a.created_at, username, first_name, last_name FROM articles a, users u WHERE LOWER(title) LIKE LOWER($1) AND u.id = a.author_id", title);

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// PROJECTION
async function getInstitutions(req, res) {
    try {
        let db = await getDB();
        let fields = req.query.include ? req.query.include : "*";
        let result = await db.query("SELECT $1:name FROM institutions", [ fields ]);

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// JOIN
async function getArticlesByUser(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT a.id, title, content, a.created_at, username, first_name, last_name FROM articles a, users u WHERE u.id = a.author_id AND u.id = $1", req.params.id);

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// Aggregation (and nested aggregation)
// 1. Count of all new users and new articles and new claps
// 2. Avg claps/user, avg claps/articles, avg articles/user
async function getAnalytics(req, res) {
    try {
        let db = await getDB();

        let result = await Promise.all([
            db.query("SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '1 WEEK'"),
            db.query("SELECT COUNT(*) FROM articles WHERE created_at > NOW() - INTERVAL '1 WEEK'"),
            db.query("SELECT SUM(count) FROM reactions WHERE created_at > NOW() - INTERVAL '1 WEEK'")
        ]);

        return res.json({ result: { newUsers: result[0][0].count, newArticles: result[1][0].count, newReactions: result[2][0].sum }});
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

async function getLeaderboard(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT username, ROUND(SUM(count)::numeric,0) AS total_claps, COUNT(article_id) AS num_articles FROM reactions, users u WHERE reactions.user_id = u.id GROUP BY u.username ORDER BY total_claps DESC");

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// Division
async function getArticlesLikedByAllUsers(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT a.id, title, content, username FROM articles a JOIN users x on x.id = a.author_id WHERE NOT EXISTS ((SELECT id FROM users) EXCEPT (SELECT r.user_id FROM reactions r WHERE a.id = r.article_id))");

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

module.exports = {
    hello,
    postUser,
    deleteArticle,
    patchUser,
    getArticles,
    getInstitutions,
    getArticlesByUser,
    getAnalytics,
    getLeaderboard,
    getArticlesLikedByAllUsers
};
