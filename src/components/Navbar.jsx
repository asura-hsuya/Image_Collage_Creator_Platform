import React from 'react'
import '../App.css'
import logo from '../assets/logo.svg'
import Home from '../assets/home.svg'
import About from '../assets/about.svg'
import Contact from '../assets/contact.svg'

function Navbar() {
    return (
        <div className='container text-white bg-[#1d2023] flex justify-between min-h-20  align-middle items-center'>
            <div className="logo flex gap-2 text-3xl items-center">
                <div className="img"><img src={logo} alt="" /></div>
                <div className="name">Fully_Functionals</div>
            </div>
            <ul className='flex gap-7'>
                <li ><a href="#"><img className=' bg-[#303236] rounded-full p-1' src={Home} alt="" /></a></li>
                <li ><a href="#"><img className=' bg-[#303236] rounded-full p-1' src={About} alt="" /></a></li>
                <li ><a href="#"><img className=' bg-[#303236] rounded-full p-1' src={Contact} alt="" /></a></li>
            </ul>
        </div>
    )
}

export default Navbar
