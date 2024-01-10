const { hashedPassword, comparePassword } = require('../helper/userBcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

// Register
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(401).json({
                message: 'All field required',
                success: false
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).json({
                message: 'User is already exist',
                success: false
            })
        }

        // hash password
        const hash = await hashedPassword(password)
        const user = await User.create({ name, email, password: hash })
        return res.status(201).json({
            message: 'User is Registered Success',
            success: true,
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `register controller ${error.message}`
        })
    }
}


// Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'All fiels is Required'
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: 'user is not found'
            })
        }

        // check password matched
        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword) {
            return res.json({
                success: false,
                message: 'Password is not matched'
            })
        }

        // token JWT
        const token = jwt.sign({ id: user._id }, process.env.jwttokensecret, { expiresIn: '1d' })
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            token
        })
    } catch (error) {
        console.log(error)
    }
}

// authController
const authController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'user is not found'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'auth controller is successfully',
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: 'auth is fail'
        })
    }
}

module.exports = { userRegister, userLogin, authController }