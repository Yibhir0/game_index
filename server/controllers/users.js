const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
const db = require("../mongoose/db");
const cache = require("memory-cache");

// Post user
exports.postUser = async (req, res) => {
    //Create a token
    const { token } = req.body
    //Create the ticket for google
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });

    try {
        const readyState = await db.connectToDB();
        if (readyState === 1) {
            //Get the user name, email, and picture from google
            const { name, email, picture } = ticket.getPayload();

            //Create the user model with the data
            const newUser = {
                "name": name,
                "email": email,
                "picture": picture,
            };

            //Then create the user document and save to db
            const user = await db.createUser(newUser);

            //Set the request session userIs to the id of the user created
            req.session.userId = user.id
            //Set the status to 201 and set the json to the user document
            res.status(201)
            res.json(user)
        }
        else {
            res.status(404)
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// log out user
exports.logOutUser = async (req, res) => {
    //destroy the session, set the status to 200 and send a message to say it was successful
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
            //Get the user from the db and sent the object 
            const user = await db.getUser(req.params.id)
            res.send(user)
        }
        else {
            res.status(404)
        }


    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

