import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from "./Title"
const BestSeller = () => {


    const { products } = useContext(ShopContext);
    //console.log(products)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller === true)
        setBestSeller(bestProduct.slice(0, 4))
    }, [products])

    //console.log(bestSeller)

    return (

        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">

                    Those are the best Seller Products on our products.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-4">
                {
                    bestSeller.map((item, index) => (

                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}

                        />
                    ))

                }

            </div>

        </div>
    )
}



export default BestSeller