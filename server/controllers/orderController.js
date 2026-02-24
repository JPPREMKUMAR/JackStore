
import orderModel from "../models/orderModel.js"


// global Variables 

const currency = "inr"
const deliveryCharge = 10



// Placing Order using COD Method


const placeOrder = async (req, res) => {


    try {

        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        console.log(orderData)



        res.status(200).json({
            success: true,
            message: "Order Placed"
        })




    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message


        })

    }


}





// All Orders Data from Admin Pannel 
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({}).sort({ date: -1 })

        res.json({
            success: true,
            orders

        })


    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }

}


// User Order Data from Frontend

const userOrders = async (req, res) => {

    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId }).sort({ date: -1 })

        res.json({
            success: true,
            orders
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


// update Order Status from Admin Pannel

const updateStatus = async (req, res) => {


    try {

        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({
            success: true,
            message: "Status Updated"
        })


    } catch (error) {

        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }
}



export { placeOrder, allOrders, userOrders, updateStatus }



