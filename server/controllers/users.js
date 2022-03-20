const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const db = require("../mongoose/db");
const cache = require("memory-cache");

// Post user
exports.postUser = async (req, res) => {

    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {

            const { name, email, picture } = ticket.getPayload();

            const newUser = {
                "name": name,
                "email": email,
                "picture": picture,
                "bio": 'Welcome to my profile!',
            };

            const user = await db.createUser(newUser);

            req.session.userId = user.id
            res.status(201)
            res.json(user)
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// log out user
exports.logOutUser = async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
}


// get user
exports.getUser = async (req, res) => {
    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            const user = await db.getUser(req.params.id)
            res.send(user)
        }
        else {
            res.status(404).json({ message: "Could not connect to the database" })
        }

        res.send(response)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

