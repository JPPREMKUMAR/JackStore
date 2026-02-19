
import userModel from "../models/userModel.js"

// add to Cart 

const addToCart = async (req, res) => {

    try {
        const { userId, itemId, size } = req.body


        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1

            } else {
                cartData[itemId][size] = 1
            }
        } else {

            cartData[itemId] = {}
            cartData[itemId][size] = 1

        }

        await userModel.findByIdAndUpdate(userId, { cartData: cartData })

        res.json({
            success: true,
            message: "Add To Cart"
        })

    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}



// update Cart


const UpdateCart = async (req, res) => {

    try {

        const { userId, itemId, size, quantity } = req.body
        console.log(userId)
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity


        await userModel.findByIdAndUpdate(userId, cartData)
        res.json({
            success: true, message: 'Cart Updated'
        })


    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}


// get User Cart Data
const getUserCart = async (req, res) => {

    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId)
        console.log(userData)
        res.json({
            success: true,
            cartData: userData
        })

    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}



export { addToCart, UpdateCart, getUserCart }