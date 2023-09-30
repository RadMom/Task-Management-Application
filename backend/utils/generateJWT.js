const jwt = require("jsonwebtoken");

const generateJWT = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", //in production secure cookies
        sameSite: "strict", //prevent CSRF attacks
        maxAge: 1 * 24 * 60 * 60 * 1000, //1 day same as token={ expiresIn: "1d" }
    });
};

module.exports = generateJWT;
