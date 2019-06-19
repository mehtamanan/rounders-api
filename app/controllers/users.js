let db = require('../db');

async function userGet(req, res) {
    // TODO
    return res.json({ message: "Hello World" });
}

async function userPost(req, res) {
    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.firstName,
        last_name: req.body.lastName
    }

    try {
        const dbConn = await db.getDB();
        await dbConn.query(
            'INSERT INTO users(${this:name}) VALUES (${this:csv})', user
        );
        res.sendStatus(201);
    } catch(e) {
        res.sendStatus(400);
    }
}

module.exports = {
    userGet,
    userPost
};
