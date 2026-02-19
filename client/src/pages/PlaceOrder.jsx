
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/frontend_assets/assets"
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const { navigate, backendUrl, jwtToken, getCartAmount, setCartItemsList, delivery_fee, cartItemsList } = useContext(ShopContext)

    const [method, setMethod] = useState('cod')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })





    const OnChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))

    }




    const onSubmitHandler = async (event) => {

        event.preventDefault()
        //console.log(cartItemsList)




        const response = await axios.post(`${backendUrl}/api/order/place`, {
            address: formData,
            items: cartItemsList,
            amount: getCartAmount()
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`

            }
        })


        if (response.data.success) {
            console.log(response)

            localStorage.removeItem("cartItemsList")
            setCartItemsList([])
            navigate("/orders")
            toast.success("Order Placed Successfully")
        } else {
            toast.error(response.messsage)
        }


    }


    return (

        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

            {/* -----------------------Left Side -----------------------  */}
            <div className="flex flex-col gap-4 w-full gap-4 sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3 ">


                    <Title
                        text1={'DELIVERY'}
                        text2={'INFORMATION'}
                    />
                </div>
                <div className="flex gap-3">

                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={OnChangeHandler}
                        value={formData.firstName}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={OnChangeHandler}
                        value={formData.lastName}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />



                </div>
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={OnChangeHandler}
                    value={formData.email}
                    className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                />
                <input
                    type="text"
                    placeholder="street"
                    name="street"
                    onChange={OnChangeHandler}
                    value={formData.street}
                    className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                />
                <div className="flex gap-3">

                    <input
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={OnChangeHandler}
                        value={formData.city}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />
                    <input
                        type="text"
                        placeholder="State"
                        name="state"
                        onChange={OnChangeHandler}
                        value={formData.state}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />

                </div>
                <div className="flex gap-3">

                    <input
                        type="number"
                        placeholder="Zipcode"
                        name="zipcode"
                        onChange={OnChangeHandler}
                        value={formData.zipcode}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={OnChangeHandler}
                        value={formData.country}
                        className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                    />
                </div>
                <input
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    onChange={OnChangeHandler}
                    value={formData.phone}
                    className="border border-gray-300 rounded py-1.5 px-3 w-full" required

                />


            </div>

            {/*------------Right Side --------------------- */}



            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>
                <div className="mt-12">

                    <Title
                        text1={'PAYMENT'}
                        text2={'METHOD'}

                    />
                    {/* -----------------------Payment Method Selection------------------ */}
                    <div className="flex gap-3 flex-col lg:flex-row ">
                        <div className="flex items-center gap-3  p-2 px-3 cursor-pointer">

                            <p className={`min-w-3.5 h-3.5 borer rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo}
                                className="h-5 mx-4"
                                alt=""
                            />
                        </div>
                        <div className="flex items-center gap-3  p-2 px-3 cursor-pointer">

                            <p className={`min-w-3.5 h-3.5  rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo}
                                className="h-5 mx-4"
                                alt=""
                            />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3  p-2 px-3 cursor-pointer">

                            <p className={`min-w-3.5 h-3.5  rounded-full  ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>
                        </div>

                    </div>


                    <div className='w-full text-end mt-8 '>

                        <button
                            type='submit'
                            className='bg-black text-white px-16 py-3 text-sm cursor-pointer' >PLACE ORDER</button>


                    </div>

                </div>

            </div>

        </form>
    )
}



export default PlaceOrder



