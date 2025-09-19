import React from 'react'
import { Link } from "react-router-dom";
import "./CSS/Header.css";
import { Heart, MessageCircle, ClipboardList, Bell, User, Search, PlusCircle } from "lucide-react";

const GuestHeader = ({ user = null, logout = () => {} }) => {
  return (
    <header className='header-d'>
        <div className="logo-section">
          <Link to="/home" className='logo'>
            <span className='logo-text1'>Unilag</span> Yard
            </Link> {/* Added to prop */}
        </div>
        
        <div className="search-section">
          <form className="search-bar" role="search">
            {/* Input field */}
            <input 
              type="text" 
              placeholder="Search for books, gadgets, items..." 
              aria-label="Search products"
            />
            {/* Search icon - placed after the input but inside the same form */}
            <Search size={20} className="search-icon" />
          </form>
        </div>
        
        <div >
          <Link to="/signUp" className='sign-btn'>Login / Sign Up</Link>
        </div>
    </header>
  )
}

export default GuestHeader;