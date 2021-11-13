import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

import generateToken from '../utils/generateToken.js'

// @desc AUTH USER
// @route POST /api/user/login
// @access PUBLIC
export const authUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credentials, please try again')      
    }
})

// @desc Register user
// @route POST /api/user
// @access PUBLIC
export const registerUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id) 
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


