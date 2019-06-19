
let { getDB } = require('../db');

async function hello(req, res) {
    return res.json({ message: "Hello World" });
}

// INSERT query
async function postUser(req, res) {
    try {
        let db = await getDB();
        let result = await db.query('INSERT INTO users(${this:name}) VALUES(${this:csv})', req.body);

        return res.json({ result });
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

// DELETE query
async function deleteArticle(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}

// UPDATE query
async function patchUser(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}

// SELECTION
async function getArticles(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}

// PROJECTION
async function getInstitutions(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}

// JOIN
async function getArticlesByUser(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}

// Aggregation (and nested aggregation)
// 1. Count of all new users and new articles and new claps
// 2. Avg claps/user, avg claps/articles, avg articles/user
async function getAnalytics(req, res) {
    res.status(500).json({ error: "To be implemented!" });
}


// Division
async function getXXX(req, res) {
    res.status(500).json({ error: "To be implemented!" });
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
    getXXX
};
