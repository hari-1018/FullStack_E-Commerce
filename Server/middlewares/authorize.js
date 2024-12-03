const CustomError = require("../utils/customErrors");

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new CustomError("Not an Admin, Access denied!" , 403);
        }
        next();
    };
};

module.exports = authorize;