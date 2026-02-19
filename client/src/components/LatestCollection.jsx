

import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext"
import Title from "./Title";
import ProductItem from "./ProductItem"

const LatestCollection = () => {

    const { products } = useContext(ShopContext)
    //console.log(products)
    const [latestProducts, setLatestProduct] = useState([])

    useEffect(() => {
        setLatestProduct(products.slice(0, 4))

    }, [products])

    return (

        <div className="my-10 ">

            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    It is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            {/*Rendering Products */}

            <div className="grid grid-cols-2 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

                {
                    latestProducts.map((item, index) => (<ProductItem
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />))

                }

            </div>

        </div>
    )
}



export default LatestCollection