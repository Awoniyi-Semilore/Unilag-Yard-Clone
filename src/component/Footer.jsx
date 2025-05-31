import React from 'react'
import { FiPlus, FiUser, FiSearch, FiInstagram, FiFacebook } from 'react-icons/fi';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-flex'>
        <div className='footer-link-flex'>
          <Link to='/about' className='footer-link'>About us</Link>
          <Link to='/contactus' className='footer-link'>Contact us</Link>
          <Link to='/howtouse' className='footer-link'>How to shop</Link>
          <Link to='/terms' className='footer-link'>Terms of use</Link>
          <Link to='/privacy' className='footer-link'>Privacy policy</Link>
        </div>
        <div >
          <h3 className='footer-link'>Contact information</h3>
          <p className='footer-link'>Email: Http......</p>
          <p className='footer-link'>Whatsapp: Http......</p>
        </div>
        <div>
          <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='socials'>
            <FiInstagram size={20} /> Instagram link...
          </a>
          <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='socials'>
            <FiFacebook size={20} /> Facebook link...
          </a>
        </div>
      </div>
      <h3 className='right'>© 2025 Unilag Yard. All rights reserved.</h3>
    </footer>
  )
}

export default Footer
