"use client";


import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';



export const ShopContext = createContext()

const ShopContextProvider = (props) => {



    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true)
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const [cartItems, setCartItems] = useState([])

    const [cartItemsList, setCartItemsList] = useState([])

    //console.log(cartItems)


    const [totalCount, setTotalCount] = useState(0)



    const updateQuantity = async (itemId, size, quantity) => {


        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if (token) {
            try {


                const response = await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })



            } catch (error) {

                console.log(error)
                toast.error(error.message)
            }

        }


    }

    const getCartAmount = () => {

        let totalAmount = 0
        for (const items in cartItems) {
            //console.log(cartItems)
            let itemInfo = products.find((product) => (product._id === items));
            for (const item in cartItems[items]) {


                try {

                    if (cartItems[items][item] > 0) {

                        totalAmount += itemInfo.price * cartItems[items][item]
                    }


                } catch (e) {

                    console.log(e)
                }
            }


        }


        return totalAmount
    }



    const navigate = useNavigate();



    const getProducts = async () => {


        try {
            const response = await axios.get(backendUrl + "/api/product/list")

            //console.log(response.data)
            if (response.data.success) {
                setProducts(response.data.message)
            } else {
                toast.error(response.data.message)
                console.log(response.data.message)
            }



        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }


    }





    const getUserCart = async (token) => {

        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            //console.log("Cart Items")
            //console.log(response)
            if (response.data.success) {
                setCartItems(response.data.cartData.cartData)
                //console.log(response.data.cartData.cartData)


            }


        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }

    }

    const [timer, setTimer] = useState(0)


    useEffect(() => {

        const timerInter = setInterval(async () => {
            const response = await axios.get(backendUrl + "/")
            console.log(response.data)
            setTimer(timer + 1)
        }, 3600000)


        return () => clearInterval(timerInter)

    }, [])

    useEffect(() => {
        getProducts()
    }, [])
    //console.log(products)





    const addToCart = (itemId, size, productData) => {
        //console.log(productData, itemId, size)
        const { price, image } = productData
        //console.log(image)
        let newCartList = []
        if (!size) {
            toast.error('Select Product Size')
            return
        }

        const isItemInCart = cartItemsList.find((item) => item.itemId === itemId && item.size === size)

        if (isItemInCart === undefined) {
            //console.log("new Item Will be added")
            const updatedItem = {
                itemId,
                size,
                quantity: 1,
                price, image: image[0]
            }
            newCartList = [...cartItemsList, updatedItem]
            console.log("final cartList", newCartList)

            localStorage.setItem("cartItemsList", JSON.stringify(newCartList))
            setCartItemsList(newCartList)

        } else {
            let newCartFinalList = []
            for (let item of cartItemsList) {
                if (item.itemId === itemId && item.size === size) {
                    console.log("Item is Present")
                    const updatedItem = {
                        itemId: item.itemId, size: item.size, quantity: item.quantity + 1, price, image: image[0]
                    }
                    newCartFinalList = [...newCartFinalList, updatedItem]
                } else {
                    newCartFinalList = [...newCartFinalList, item]
                }
            }
            localStorage.setItem("cartItemsList", JSON.stringify(newCartFinalList))
            setCartItemsList(newCartFinalList)
        }

        let countItems = 0
        cartItemsList.map((item) => countItems += item.quantity)
        setTotalCount(countItems)



    }

    const getTotalCartAmount = () => {
        let newTotal = 0
        cartItemsList.map((val) => newTotal += val.quantity * val.price)
        return newTotal
    }


    useEffect(() => {
        const getCartItemsList = JSON.parse(localStorage.getItem("cartItemsList")) || []

        console.log("cartItemsList", getCartItemsList)

        let countItems = 0
        getCartItemsList.map((item) => countItems += item.quantity)
        //console.log(countItems)

        setCartItemsList(getCartItemsList)
        setTotalCount(countItems)


    }, [])









    const value = {

        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        updateQuantity,
        setShowSearch,
        addToCart,
        cartItems,
        totalCount,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems, cartItemsList,
        getTotalCartAmount


    }


    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }

    }, [])

    //console.log(cartItems)

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider

