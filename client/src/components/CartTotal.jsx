"use client";
import { useContext } from 'react'


import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"


const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount, getTotalCartAmount } = useContext(ShopContext)


    const totalAmount = getTotalCartAmount()
    // console.log(totalAmount)
    return (

        <div className='w-full'>

            <div className='text-2xl '>
                <Title
                    text1={'CART'}
                    text2={'TOTALs'}
                />
                <div className="flex flex-col gap-2 mt-2 text-sm">


                    <div className='flex justify-between '>

                        <p>SubTotal</p>
                        <p>{currency} {totalAmount}.00</p>
                    </div>
                    <hr />
                    <div className='flex justify-between '>
                        <p>Shipping Fee</p>
                        <p>{currency} {delivery_fee}.00 </p>
                    </div>
                    <hr />
                    <hr />
                    <div className='flex justify-between '>
                        <b>Total</b>
                        <b>{currency} {totalAmount === 0 ? 0 : totalAmount + delivery_fee}.00</b>

                    </div>
                </div>

            </div>


        </div>
    )
}


export default CartTotal