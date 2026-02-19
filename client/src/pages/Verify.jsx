
import React, { useState, useEffect, useContext } from 'react'

import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'



const Verify = () => {


    const { navigate, jwtToken, setCartItems, backendUrl } = useContext(ShopContext)
    const { searchParams, setSearchParams } = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')



    useEffect(() => {
        console.log("hello World")
    }, [jwtToken])
    return (

        <div>

            <h1>Verify</h1>
        </div>
    )
}


export default Verify