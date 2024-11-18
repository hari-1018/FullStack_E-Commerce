const jwt = require('jsonwebtoken');

const tokenGenerated = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    const expiration = process.env.JWT_EXPIRATION_TIME || '1d';

    try {
        console.log("JWT_EXPIRATION_TIME used:", expiration);
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Failed to generate JWT token");
    }
};

const verifyTokenGenerated = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error("Invalid or expired token");
    }
};

module.exports = { tokenGenerated, verifyTokenGenerated };
