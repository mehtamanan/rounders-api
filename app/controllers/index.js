
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

// Aggregates
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

// Nested Aggregates
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

// BONUS
async function getDeepArticles(req, res) {
    try {
        let db = await getDB();
        let q = `SELECT
                    a.id,
                    a.title,
                    a.content,
                    a.created_at,
                    u.username,
                    u.first_name,
                    u.last_name,
                    JSON_AGG(JSON_BUILD_OBJECT('count', r.count, 'user_id', x.id, 'username', x.username, 'first_name', x.first_name, 'last_name', x.last_name)) AS reactions
                FROM articles a
                JOIN users u
                ON a.author_id = u.id
                LEFT JOIN reactions r
                ON a.id = r.article_id
                LEFT JOIN users x
                on r.user_id = x.id
                GROUP BY a.id, a.title, a.content, a.created_at, u.username, u.first_name, u.last_name`;
        let result = await db.query(q);

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// EXTRAS
async function getTags(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT * FROM tags");

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// Extra
async function getUsers(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT * FROM users");

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// Extra
async function getUser(req, res) {
    try {
        let db = await getDB();
        let result = await db.query("SELECT * FROM users WHERE id = $1 LIMIT 1", req.params.id);

        return res.json({ result: result });
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
    getArticlesLikedByAllUsers,
    getTags,
    getUser,
    getUsers,
    getDeepArticles
};
