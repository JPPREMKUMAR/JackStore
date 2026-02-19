
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/frontend_assets/assets"
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

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




    const initPay = (order) => {

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {

                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})

                    }

                }


                catch (error) {
                    console.log(error)
                    toast.error(error)


                }

            }

        }

        const rzp = new window.Razorpay(options)
        rzp.open()


    }


    const OnChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))

    }




    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)

                        }

                    }

                }
            }
            //console.log(orderItems)

            let orderData = {

                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            //console.log(orderData)

            switch (method) {
                case 'cod':

                    const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } })
                    console.log(response)
                    if (response.data.success) {
                        navigate("/orders")
                        setCartItems({})

                    } else {
                        toast.error(response.data.message)
                    }

                    break;
                case "stripe":
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })

                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)

                    } else {
                        toast.error(responseStripe.data.message)
                        console.log(responseStripe.data.message)

                    }

                    break
                case "razorpay":
                    const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } })

                    if (responseRazorpay.data.success) {
                        console.log(responseRazorpay.data.order)
                        initPay(responseRazorpay.data.order)
                    } else {

                    }



                    break
                default:
                    break

            }

        } catch (error) {
            console.log(error)
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
                        <div onClick={() => setMethod('stripe')} className="flex items-center gap-3  p-2 px-3 cursor-pointer">

                            <p className={`min-w-3.5 h-3.5 borer rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.stripe_logo}
                                className="h-5 mx-4"
                                alt=""
                            />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3  p-2 px-3 cursor-pointer">

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
                            className='bg-black text-white px-16 py-3 text-sm' >PLACE ORDER</button>


                    </div>

                </div>

            </div>

        </form>
    )
}



export default PlaceOrder