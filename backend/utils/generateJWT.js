const jwt = require("jsonwebtoken");

const generateJWT = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true, //this was : process.env.NODE_ENV !== "development", //in production secure cookies
        sameSite: "none", //prevent CSRF attacks . It was strict but can't set the cookie on the frontend
        maxAge: 1 * 24 * 60 * 60 * 1000, //1 day same as token={ expiresIn: "1d" }
    });
};

module.exports = generateJWT;
