const User = require("../models/user.model");
const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const transporter = require("../config/email.configuration");
dotenv.config();
module.exports.userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword, tc } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        res.status(400).json({
            "status": "failed", "message": "Email already exists"
        })
    } else {
        if (name && email && password && confirmPassword && tc) {
            if (password === confirmPassword) {
                try {
                    const salt = await bycript.genSalt(10);
                    const hashedPassword = await bycript.hash(password, salt)
                    const saveUser = new User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        tc: tc
                    })
                    await saveUser.save();
                    // Generate JWT Token
                    const token = jwt.sign({ userID: saveUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });

                    res.status(200).json({ "status": "success", "message": "Registration Success", user: saveUser, "token": token })
                } catch (err) {
                    console.log(err);
                    res.status(504).json({ "status": "failed", "message": "Unable to Register" })
                }
            } else {
                res.status(400).json({ "status": "failed", "message": "Password & confirmPassword does not match..!" })
            }
        } else {
            res.status(400).json({ "status": "failed", "message": "all fields are Required." })
        }
    }
}

module.exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email: email });
            if (user != null) {
                console.log(user.password);
                const isMAtch = await bycript.compare(password, user.password);
                if ((user.email === email) && isMAtch) {
                    //Generate token
                    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
                    res.status(200).json({ "status": "success", "message": "Login Success", "token": token })

                } else {
                    res.status(400).json({ "status": "failed", "message": "Email or Password is not Valid..!" })
                }
            } else {
                res.status(400).json({ "status": "failed", "message": "You are not a Registered User.!" })
            }
        } else {
            res.status(400).json({ "status": "failed", "message": "all fields are Required." })
        }
    } catch (err) {
        console.log(err);
        res.status(504).json({ "status": "failed", "message": "Unable to Login" })
    }

}
module.exports.loggedUserDetails = async (req, res) => {
    res.status(200).json({ "status": "success", "message": "Logged User Details ", "User": req.user })
}
module.exports.sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ "status": "failed", "message": "Email Field is Required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ "status": "failed", "message": "Email doesn't exist" });
        }

        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
     
        const link = `http://localhost:3000/changePassword/${user._id}/${token}`; // Update with your actual domain

        console.log(link);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "UserRegister - Password Reset Link",
            html: `<a href=${link}>Click Here</a> to Reset Your Password`
        });

        res.status(200).json({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" ,"token":token});
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ "status": "error", "message": "Internal Server Error" });
    }
};


module.exports.userResetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;
    const user = await User.findById(id);
    const newScrect = user._id + process.env.JWT_SECRET_KEY
    try {
        jwt.verify(token, newScrect)
        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                res.status(400).json({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
            } else {
                const newHashPassword = await bycript.hash(password, 10);
                await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
                res.status(200).json({ "status": "success", "message": "Password changed succesfully" })

            }
        } else {
            res.status(400).json({ "status": "failed", "message": "all fields are Required." })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ "status": "failed", "message": "Invalid Token" })
    }
}


module.exports.changeUserPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password && confirmPassword) {
        if (password !== confirmPassword) {
            res.status(400).json({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
            const newHashPassword = await bycript.hash(password, 10);
            await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
            res.status(200).json({ "status": "success", "message": "Password changed succesfully" })
        }
    } else {
        res.status(400).json({ "status": "failed", "message": "all fields are Required." })
    }
}
