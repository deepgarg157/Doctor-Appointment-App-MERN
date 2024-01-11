const { hashedPassword, comparePassword } = require('../helper/userBcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const doctorModel = require('../model/doctorModel')

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
        const token = jwt.sign({ id: user._id }, process.env.jwttokensecret, {})
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
        user.password = undefined
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
                data: user
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

// Apply Doctor
const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: "pending" });
        await newDoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: "/admin/doctors",
            },
        });
        await User.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: "Doctor Account Applied SUccessfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error WHile Applying For Doctotr",
        });
    }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const seennotification = user.seenNotification;
      const notification = user.notification;
      seennotification.push(...notification);
      user.notification = [];
      user.seenNotification = notification;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in notification",
        success: false,
        error,
      });
    }
  };

  // delete notifications
const deleteAllNotificationController = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.notification = [];
      user.seenNotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications Deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "unable to delete all notifications",
        error,
      });
    }
  };

module.exports = { userRegister, userLogin, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController }