import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET);

}

// Route For User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)

        const user = await userModel.findOne({ email: email });


        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exists."

            });
        }
        const isMatch = await bcrypt.compare(password, user.password)


        if (isMatch) {
            const jwtToken = generateToken(user._id)
            return res.json({

                success: true,
                message: "Login Successful", jwt_token: jwtToken
            })

        } else {

            return res.json({
                success: false,
                message: "Invalid credientials"

            })
        }



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message

        })
    }

}

// Route For User Register
const registerUser = async (req, res) => {



    try {


        const { name, email, password } = req.body


        // checking user already exists or not 
        const exists = await userModel.findOne({ email: email })
        console.log(exists);
        if (exists) {

            return res.json({
                success: false,
                message: "User already exists."
            })
        } else {
            // validating email format & stromg password
            if (!validator.isEmail(email)) {
                return res.json({
                    success: false,
                    message: "Please enter valid Email."
                })
            }
            if (password.length < 8) {
                return res.json({
                    success: false,
                    message: "Please enter strong password."
                })
            }

            //Hashed Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({

                name,
                email,
                password: hashedPassword
            })

            const user = await newUser.save(); //_id is generated default 

            const jwtToken = generateToken(user._id);

            res.json({
                success: true, jwt_token: jwtToken

            })
        }

    } catch (error) {


        console.log(error);
        res.json({
            success: false,
            message: error.message

        })
    }


}


// Route for Admin Login

const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const jwtToken = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({
                success: true,
                message: jwtToken,
                jwt_token: jwtToken
            })

        } else {

            res.json({
                success: false,
                message: "Invalid Credientials"
            })
        }

    } catch (error) {

        console.log(error);
        res.json({
            success: false,
            message: error.message

        })
    }
}


export { loginUser, registerUser, adminLogin }