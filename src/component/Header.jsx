import React from 'react'
import { Link } from "react-router-dom";
import "./CSS/Header.css";
import { Heart, MessageCircle, ClipboardList, Bell, User, Search, PlusCircle } from "lucide-react";

const Header = ({ user = null, logout = () => {} }) => {
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
        
        <div className="nav-icons">
          <Heart size={24} color="#4e5d6c" className="icon-hover heart-icon" />      
          <MessageCircle size={24} color="#4e5d6c" className="icon-hover message-icon" /> 
          <ClipboardList size={24} color="#4e5d6c" className="icon-hover advert-icon" /> 
          <Bell size={24} color="#4e5d6c" className="icon-hover bell-icon" />       
          <User size={24} color="#4e5d6c" className="icon-hover profile-icon" />
          <button className='product-btn'>
            <Link to="/addProduct" className='product-btn'>
              <PlusCircle size={20} className="btn-icon" /> {/* Adjusted size */}
              <span>Add Product</span>
            </Link>
          </button>
        </div>
    </header>
  )
}

Header.defaultProps = {
  user: null,
  logout: () => {}
};

export default Header



// import React from 'react'
// import { Link } from "react-router-dom";
// import "./CSS/Header.css";
// import { Heart, MessageCircle, ClipboardList, Bell, User, Search, PlusCircle } from "lucide-react";


// const Header = ({ user = null, logout = () => {} }) => {

//   return (
//     <header className='header-div'>
//       <div>
//         <div><Link className='logo'>Unilag Yard</Link></div>
//         <div>
//           <form class="search-bar" role="search">
//             <input type="text" placeholder="Search for books, gadgets, items..." 
//             < Search size={24} color="#4e5d6c" className="icon-hover" /> />
//             <button type="submit" aria-label="Submit search"></button>
//           </form>
//         </div>
//         <div>
//           <Heart size={24} color="#4e5d6c" className="icon-hover" />      
//           <MessageCircle size={24} color="#4e5d6c" className="icon-hover" /> 
//           <ClipboardList size={24} color="#4e5d6c" className="icon-hover" /> 
//           <Bell size={24} color="#4e5d6c" className="icon-hover" />       
//           <User size={24} color="#4e5d6c" className="icon-hover" />
//           <button className='product-btn'>
//             <PlusCircle size={24} color="#4e5d6c" className="icon-hover" />
//             Add Product
//           </button>
//         </div>
//       </div>
//     </header>
//   )
// }

// Header.defaultProps = {
//   user: null,
//   logout: () => {}
// };

// export default Header
