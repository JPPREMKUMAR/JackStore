import { useState, useEffect } from 'react'
import axios from 'axios'
import { assets } from "../assets/assets"

import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {


    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestSeller", bestSeller)
            formData.append("sizes", JSON.stringify(sizes))


            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)




            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            //console.log(token)


            if (response.data.success) {
                console.log(response.data)
                toast.success(response.data.message)

                setName('')
                setDescription("")
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice("")
            } else {

                toast.error(response.data.message)
            }


        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }



    }




    return (

        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3">
            <div>

                <p>Upload Image</p>
                <div className="flex gap-2 mt-5">
                    <label htmlFor="image1">
                        <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                            alt=""
                            className="w-20"
                        />
                        <input
                            onChange={(event) => setImage1(event.target.files[0])}
                            type='file' id="image1"
                            hidden

                        />
                    </label>
                    <label htmlFor="image2">
                        <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                            alt="" className="w-20"
                        />
                        <input
                            onChange={(event) => setImage2(event.target.files[0])}
                            type='file' id="image2"
                            hidden

                        />
                    </label>

                    <label htmlFor="image3">
                        <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                            alt="" className="w-20"
                        />
                        <input
                            onChange={(event) => setImage3(event.target.files[0])}
                            type='file' id="image3"
                            hidden

                        />
                    </label>

                    <label htmlFor="image4">
                        <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}

                            alt="" className="w-20"
                        />
                        <input
                            onChange={(event) => setImage4(event.target.files[0])}
                            type='file' id="image4"
                            hidden

                        />
                    </label>

                </div>

            </div>


            <div className="w-full">

                <p className="mb-1">Product Name</p>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Type Here"
                    required
                    className="w-full max-w-[500px] px-4 py-2 border outline-none mt-2 rounded-sm"

                />
            </div>
            <div className="w-full">

                <p className="mb-1">Product Description</p>
                <textarea
                    type="text"
                    placeholder="Write Content Here"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                    className="w-full max-w-[500px] px-4 py-2 border outline-none mt-2 rounded-sm"

                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 ">

                <div>
                    <p className="mb-2">Product Category</p>

                    <select className="w-full px-3 py-2 border outline-none"

                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Sub Category</p>

                    <select className="w-full px-3 py-2 border outline-none"
                        value={subCategory}
                        onChange={(event) => setSubCategory(event.target.value)}
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>

                    <p className="mb-2">Product Price</p>
                    <input
                        type="number"
                        placeholder="25"
                        value={price} onChange={(event) => setPrice(event.target.value)}
                        className="border w-full px-3 py-2 sm:w-[120px] outline-none"

                    />
                </div>
            </div>
            <div>

                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">

                    <div onClick={() => setSizes(prevState => prevState.includes("S") ? prevState.filter((item) => item !== "S") : [...prevState, "S"])} >
                        <p className={`${sizes.includes("S") ? 'bg-pink-300' : 'bg-slate-300 '} px-3 py-1 cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prevState => prevState.includes("M") ? prevState.filter((item) => item !== "M") : [...prevState, "M"])} >
                        <p className={`${sizes.includes("M") ? 'bg-pink-300' : 'bg-slate-300 '} px-3 py-1 cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prevState => prevState.includes("L") ? prevState.filter((item) => item !== "L") : [...prevState, "L"])} >
                        <p className={`${sizes.includes("L") ? 'bg-pink-300' : 'bg-slate-300 '} px-3 py-1 cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prevState => prevState.includes("XL") ? prevState.filter((item) => item !== "XL") : [...prevState, "XL"])} >
                        <p className={`${sizes.includes("XL") ? 'bg-pink-300' : 'bg-slate-300 '} px-3 py-1 cursor-pointer`}>XL</p>
                    </div>
                    <div onClick={() => setSizes(prevState => prevState.includes("XXL") ? prevState.filter((item) => item !== "XXL") : [...prevState, "XXL"])} >
                        <p className={`${sizes.includes("XXL") ? 'bg-pink-300' : 'bg-slate-300 '} px-3 py-1 cursor-pointer`}>XXL</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-2">

                <input
                    type="checkbox"
                    id="bestSeller"
                    value={bestSeller}
                    onChange={() => setBestSeller(prev => !prev)}
                    checked={bestSeller}

                />
                <label className="cursor-pointer" htmlFor="bestSeller">Add to bestseller</label>
            </div>


            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
        </form>
    )
}


export default Add