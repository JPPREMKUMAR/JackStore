import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    //console.log(token)




    const [listItems, setListItems] = useState([]);


    const fetchList = async () => {


        try {


            const response = await axios.get(backendUrl + "/api/product/list", { headers: { token } })
            console.log(response.data)
            if (response.data.success) {
                // console.log(response.data)
                toast.success(response.data.message)
                setListItems(response.data.message)

            } else {

                toast.error(response.data.message)
            }



        } catch (error) {

            console.log(error.message)
            toast.error(error.message)
        }



    }

    useEffect(() => {

        fetchList()

    }, [])




    const removeProduct = async (id) => {

        try {
            // console.log(id)



            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

            if (response.success) {
                console.log(response.message)
                toast.success(response.data.message)
                await fetchList()
            } else {
                toast.error(response.data.message)

            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }
    }
    console.log(listItems)
    return (

        <>

            <p className="mb-2">All Products List</p>

            <div className="flex flex-col gap-2 ">

                {/* ------- LIST TABLE TITLE-----------*/}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>

                </div>


                {/* ----------- Product List --------- */}


                {

                    listItems.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1  text-sm'>
                            <img src={item.image[0]} alt='Main Image' className='w-12' />
                            <p >{item.name}</p>
                            <p>{item.category}</p>
                            <p> {currency}{item.price}</p>
                            <p

                                onClick={() => removeProduct(item._id)}
                                className="text-right md:text-center cursor-pointer text-lg">X</p>
                        </div>

                    ))
                }

            </div>

        </>

    )
}


export default List