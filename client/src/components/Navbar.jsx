import { assets } from '../assets/frontend_assets/assets'
import { NavLink, Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [visiable, setVisiable] = useState(false)

    const { setShowSearch, totalCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)


    const logout = () => {
        navigate("/login")
        localStorage.removeItem("token")
        setToken('')
        setCartItems({})


    }


    return (
        <div className="h-40 flex items-center justify-between py-4 font-medium px-2">
            <Link to="/">
                <img src={assets.logo} alt="logo" className="w-36" />
            </Link>


            <ul className="hidden sm:flex gap-5 text-sm text-gray-700 pt-0 pb-0 md:pt-0 pb-0">
                <NavLink to="/" className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/collection" className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/about" className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/contact" className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

            </ul>

            <div className="flex items-center gap-6 ">

                <img src={assets.search_icon} className="w-5 cursor-pointer" alt="search-icon" onClick={() => setShowSearch(true)} />
                <div className="group relative">
                    <img src={assets.profile_icon} alt="profile-icon"
                        onClick={() => token ? null : navigate('/login')}
                        className="w-5 curser-pointer" />

                    {/* Drop Down Menu */}

                    {
                        token && <div className="group-hover:block hidden absolute dropdown-menu  right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <p className="cursor-pointer hover:text-black">My Profile</p>
                                <p className="cursor-pointer hover:text-black" onClick={() => navigate("/orders")} >Orders</p>
                                <p className="cursor-pointer hover:text-black" onClick={logout}>Logout</p>
                            </div>
                        </div>
                    }


                </div>


                <Link to="/cart" className="relative" >

                    <img
                        src={assets.cart_icon}
                        alt="cart-icon"
                        className="w-5 min-w-5"

                    />
                    <p className="absolute right-[-5px] bottom-[-5px] text-center w-4 leading-4 bg-black text-white rounded-full text-[8px]">{totalCount}</p>
                </Link>

                <img onClick={() => setVisiable(true)} src={assets.menu_icon} alt="menu-icons" className="w-5 cursor-pointer sm:hidden " />
            </div>
            {/* Sidebar memu for small screens  */}
            <div className={`${visiable ? 'w-full' : 'w-0 md:hidden'} sm:absoulte top-0 right-0 bottom-0 overflow-hidden  bg-white transition-all `}>
                <div className="flex flex-col text-gray-600">
                    <div className="flex items-center gap-4 p-3" onClick={() => setVisiable(false)}>

                        <img className="h-5 rotate-180" src={assets.dropdown_icon} />
                        <p>back</p>
                    </div>
                    <NavLink onClick={() => setVisiable(false)} to="/" className='py-2 pl-6 border'>HOME</NavLink>
                    <NavLink onClick={() => setVisiable(false)} to="/collection" className='py-2 pl-6 border'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisiable(false)} to="/about" className='py-2 pl-6 border'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisiable(false)} to="/contact" className='py-2 pl-6 border'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    )
}


export default Navbar