const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            // it is in form 'Bearer sdjvnsjnvownowboh4uhhrwo' so we split this with a space and then take the second part as token
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user form the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports = { protect }