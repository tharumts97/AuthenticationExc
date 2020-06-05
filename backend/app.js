const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
    res.json({
        message: "Hello! Welcome!",
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log("error--------");
        } else {
            res.json({
                message: "POST done...",
                authData,
            });
        }
    });
});

app.post("/api/login", (req, res) => {
    //Asynchronous

    //Create a mock user
    const user = {
        id: 1,
        username: "abc",
        email: "abc@gmail.com",
    };
    jwt.sign({ user }, "secretkey", { expiresIn: "12000s" }, (err, token) => {
        res.json({
            token,
        });
        console.log(token);
    });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

//verifyToken function
function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    // check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(" ");
        //second value [1] in the array will be the access token

        //Get token from array
        const bearerToken = bearer[1];

        //Set the token
        req.token = bearerToken;

        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log("Server started on port 5000"));
