import React, { useState, useEffect, useContext } from "react"
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from "react-toastify"
import Cookies from "js-cookie"


const Login = () => {


    const [currentState, setCurrentState] = useState('Login')


    const { jwtToken, setJwtToken, backendUrl, navigate } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) => {

        event.preventDefault()
        try {

            if (currentState === 'Sign Up') {
                const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
                //console.log(response.data)
                if (response.data.success) {

                    const jwtToken = response.data.jwt_token
                    setJwtToken(response.data.jwt_token)
                    Cookies.set("jwt_token", jwtToken, { expires: 30 })
                    navigate("/")

                } else {

                    toast.error(response.data.message)
                }


            } else {


                const response = await axios.post(backendUrl + '/api/user/login', { email, password })
                console.log(response.data)
                if (response.data.success) {
                    const jwtToken = response.data.jwt_token
                    setJwtToken(response.data.jwt_token)
                    Cookies.set("jwt_token", jwtToken, { expires: 30 })
                    navigate("/")
                } else {

                    toast.error(response.data.message)
                }
            }


        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {

        if (jwtToken) {
            navigate("/")
        }
    }, [jwtToken])

    return (

        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800">
            <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
                <p className="text-3xl ">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>
            {currentState === 'Login' ? '' : <input type="text" className="w-full px-3 py-2 border border-gray-800 " value={name} onChange={((e) => setName(e.target.value))} placeholder="Name" required />}
            <input type="email" className="w-full px-3 py-2 border border-gray-800 " value={email} onChange={((e) => setEmail(e.target.value))} placeholder="Email" required />
            <input type="password" className="w-full px-3 py-2 border border-gray-800 " value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                <p className="cursor-pointer">Forgot your password?</p>
                {

                    currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer ">Create Account</p> :
                        <p onClick={() => setCurrentState('Login')} className="cursor-pointer ">Login Here</p>
                }

            </div>

            <button className="bg-black text-white px-8 py-2 mt-4 font-light">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        </form>
    )
}



export default Login