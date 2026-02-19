
import "dotenv/config"

import mongoose from 'mongoose'


const connectDB = async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/jack-store`);
        console.log('MongoDb Connected Successfully.')

    } catch (error) {

        console.log(error)
    }

}


export default connectDB