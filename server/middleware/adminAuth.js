

import jwt from 'jsonwebtoken'


const adminAuth = async (req, res, next) => {

    try {


        const { token } = req.headers;
        //console.log(token)

        if (token === undefined) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        } else {

            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            const adminDetails = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD

            if (token_decode === adminDetails) {
                next()

            } else {

                return res.json({
                    success: false,
                    message: "Not Authorized Login Again"

                })
            }


        }




    } catch (error) {

        return res.json({
            success: false,
            message: error.message
        })
    }


}


export default adminAuth