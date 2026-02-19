import jwt from 'jsonwebtoken'



const authUser = async (req, res, next) => {


    const authHeaders = req.headers["authorization"].split(" ")
    //console.log(authHeaders)
    const jwtToken = authHeaders[1]
    if (jwtToken === undefined) {
        return res.json({
            success: false,
            message: "Not Authorized Login Again."

        })
    } else {
        try {
            const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)
            req.body.userId = payload.id
            next()

        } catch (error) {
            console.log(error)
            return res.json({
                success: false, message: error.message
            })
        }

    }



}




export default authUser

