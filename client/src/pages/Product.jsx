import { useParams } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

import RelatedProducts from "../components/RelatedProducts"

const Product = () => {
    const { productId } = useParams();
    // console.log(productId)
    const { products, currency, addToCart } = useContext(ShopContext)

    const [productData, setProductData] = useState(false)


    const [image, setImage] = useState('')


    const [size, setSize] = useState('')
    const getProductItem = () => {
        //console.log(products)
        products.map((item) => {

            if (item._id === productId) {

                setProductData(item)
                setImage(item.image[0])
                return null
            }
        })

    }

    useEffect(() => {
        getProductItem();
    }, [productId])


    //console.log(productData)
    //console.log(image)




    return productData ? (

        <div className="border-t-2 pt-10  transition-opacity ease-in duration-500 opacity-100">


            {/* ------------------------------- Product Data ------------------------- */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row  ">

                {/*--------------------------------Product Images --------------------------*/}

                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row min-w-[50%]">

                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scrool justify-between  sm:justify-normal sm:w-[18.7%] w-full">
                        {

                            productData.image.map((item, index) => (
                                <img src={item} alt="" key={index}
                                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                    onClick={() => (setImage(item))}

                                />

                            ))
                        }

                    </div>
                    <div className="w-full sm:w[80%] ">

                        <img src={image} alt="" className="w-full h-auto"


                        />
                    </div>

                </div>


                {/* -------------------------- Product Info ---------------------- */}

                <div className="flex-1 min-w-[50%]">
                    <h1 className="font-medium text-2x mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-2 mt-2 ">
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>

                    <p className="mt-5 text-gray-500 md:4/5">{productData.description}</p>

                    <div className="flex flex-col gap-4 my-8">

                        <p>Select Size</p>
                        <div className="flex gap-2 ">

                            {
                                productData.sizes.map((item, index) => (
                                    <button onClick={() => setSize(item)} className={` px-4 py-2 bg-gray-200 ${item === size ? `border border-orange-500` : ''}  `} key={index} >{item}</button>

                                ))
                            }
                        </div>
                    </div>


                    <button
                        type="button"
                        onClick={() => addToCart(productData._id, size, productData)}
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700" >ADD TO CART</button>
                    <hr className="mt-8 sm:w-4/5" />

                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">

                        <p className="">100% Original Product.</p>
                        <p className="">Cash on delivery available on this product.</p>
                        <p className="">Easy return and exchange policy within 7 days.</p>

                    </div>
                </div>


            </div>

            {/*----------------------------------Description And Review Section--------------------------------- */}

            <div className="mt-10">

                <div className="flex ">

                    <b className=" px-5 py-3 text-sm ">Description</b>
                    <b className=" px-5 py-3 text-sm text-gray-500 ">Reviews (122)</b>
                </div>

                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">

                    <p>An Dummy text</p>
                    <p>An Dummy text</p>


                </div>

            </div>


            {/*--------------- Display Related Products ------------------- */}

            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />




        </div>
    ) : (<div className="opacity-0">


    </div>)
}



export default Product