const jwt = require('jsonwebtoken');
const user = require('../model/user');


exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const verfiyUser = jwt.verify(token, process.env.tokenKey);
        console.log('verfiyr', verfiyUser)

        req.user = await user.findById(verfiyUser.id)
        // req.token = token
        //  = data;
        next()
    }
    catch (err) {
        res.status(401).json({ message: "invalid token request " })
    }
}

exports.authorizeRoles = (...Permissions) => {
    console.log(Permissions);
    return async (req, res, next) => {
        if (!Permissions.includes(req.user.Permissions)) {
            console.log(req.user.Permissions, 'roles');
            return next(res.json("roles not allowed"))
        }
        next()
    }
}