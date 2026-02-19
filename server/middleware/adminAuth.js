

import jwt from 'jsonwebtoken'


const adminAuth = async (req, res, next) => {

    try {



        const authHeaders = req.headers["authorization"].split(" ")
        //        console.log(authHeaders)
        const jwtToken = authHeaders[1]

        if (jwtToken === undefined) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        } else {

            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const adminDetails = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD

            if (payload === adminDetails) {
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