import { useContext } from "react"
import { assets } from '../assets/frontend_assets/assets'

import { ShopContext } from "../context/ShopContext"
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
const Carts = () => {
    const { products, cartItemsList, navigate, currency } = useContext(ShopContext)
    console.log(cartItemsList)


    const updateQuantity = (itemId, size) => {
        console.log(itemId, size)

    }

    return (
        <div className="border-t pt-14">

            <div className="text-2xl mb-3">


                <Title text1={'YOUR'} text2={'CART'} />


            </div>



            {
                cartItemsList.length === 0 ? <div className="flex flex-col justify-center items-center h-100 text-2xl">

                    <Title text1={"Your Cart "} text2={"Empty"} />
                </div> :

                    <div>

                        {
                            cartItemsList.map((item, index) => (

                                <div key={index} className="py-4 border0t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"  >

                                    <div className='flex  items-start gap-6'>
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-16 sm:w-20"
                                        />
                                        <div>

                                            <p className='text-xs sm:text-lg font-medium '>{item.name}</p>
                                            <div className="flex items-center gap-5 mt-5 ">
                                                <p>{currency}{item.price}</p>
                                                <p className='px-2 sm:px-3 sm:py-1  bg-slate-50'>{item.size}</p>
                                            </div>
                                        </div>

                                    </div>

                                    <input
                                        onChange={(event) => event.target.value === '' || event.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(event.target.value))}
                                        type="number" min={1} defaultValue={item.quantity}

                                        className="border max-w-13 sm:max-w-20 px-1 sm:px-2 py-1"
                                    />
                                    <img
                                        onClick={() => updateQuantity(item._id, item.size, 0)}
                                        src={assets.bin_icon}
                                        className="w-4 mr-4 sm:w-5 cursor-pointer "
                                        alt=""
                                    />
                                </div>

                            ))
                        }

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

                    </div>



            }

        </div>
    )
}


export default Carts