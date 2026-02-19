
import express from 'express'

import { addToCart, UpdateCart, getUserCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRoute = express.Router();



// add to cart 


cartRoute.post("/add", authUser, addToCart);


// update cart 

cartRoute.post('/update', authUser, UpdateCart);

// get cart

cartRoute.post('/get', authUser, getUserCart)






export default cartRoute