import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


const app = express();



// PORT NUMBER
const port = process.env.PORT || 4000
// mongodb connection 
connectDB();
//connect Cludinary
connectCloudinary()


// middleware 
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//api endpoints

app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRoute)

app.use("/api/order", orderRouter)


app.get('/', (req, res) => {

    res.send("API WORKING");

})




// Start Server
app.listen((port), () => {

    console.log(`server working on PORT ${port}`)

})