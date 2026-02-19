import React, { useContext, useEffect, useState } from 'react'

import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'



const RelatedProducts = ({ category, subCategory }) => {


    const { products } = useContext(ShopContext)

    const [related, setRelated] = useState([])



    useEffect(() => {

        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => (category === item.category))
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            //console.log(productsCopy.slice(0, 8))
            setRelated(productsCopy.slice(0, 8))


        }

    }, [products])



    //console.log(related)
    return (


        <div className='my-24 '>
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex items-center">
                    {
                        related.map((item, index) => (

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


        </div>
    )

}




export default RelatedProducts