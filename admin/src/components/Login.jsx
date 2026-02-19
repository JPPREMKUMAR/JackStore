import axios from 'axios'
import { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Login = (props) => {

    const { setToken } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmitHandler = async (event) => {

        try {
            event.preventDefault();
            // console.log(email, password)
            //console.log(backendUrl)

            const url = `${backendUrl}/api/user/admin`
            //console.log(url)

            const response = await axios.post(url, { email, password })
            //console.log(response.data)
            if (response.data.success === true) {
                //console.log(response.data.message)
                const token = response.data.message
                setToken(token)


            } else {
                console.log(response.data.message)

                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center w-full">

            <div className="bg-white shadow-md rounded-lg px-8 py-4 max-w-md p-5" >
                <h1 className="text-2xl font-bold mb-5">Admin Panel </h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Enter Address</p>
                        <input
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>


                    <div className="mb-3 min-w-72">
                        <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
                        <input
                            className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>
                    <button type='submit' className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" >Login</button>
                </form>
            </div>
        </div>
    )
}


export default Login