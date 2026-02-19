import React, { useContext } from "react"

import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
const Carts = () => {
    const { products, cartItemsList, navigate } = useContext(ShopContext)
    console.log(products)

    return (
        <div className="border-t pt-14">

            <div className="text-2xl mb-3">


                <Title text1={'YOUR'} text2={'CART'} />


            </div>



            {
                cartItemsList.length === 0 ? <div className="flex flex-col justify-center items-center h-100 text-2xl">

                    <Title text1={"Your Cart "} text2={"Empty"} />
                </div> :
                    <div className='flex justify-end my-20'>
                        <div className="w-full sm:w-[450px]">
                            <CartTotal />


                            <div className='w-full text-end'>


                                <button
                                    onClick={() => navigate('/place-order')}
                                    className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>


                            </div>
                        </div>

                    </div>

            }

        </div>
    )
}


export default Carts