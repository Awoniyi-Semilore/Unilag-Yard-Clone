import React, { useState } from 'react'
import Header from '../component/Header'
import { Link } from 'react-router-dom'
import '../App.css'
import Footer from '../component/Footer'


const LandingPage = () => {
  return (
    <div >
      <div className='landing' >
        <h1>Welcome to Unilag Yard</h1>
        <p>Please choose <span className='highlight'>Guest Mode</span> to explore or <span className='highlight'>Login/Signup</span> to access your account.</p>
        <div className='landing-btns-flex'>
          <Link to="/home" className='landing-btns'>Guest Mode</Link>
          <Link to="/login" className='landing-btns'>Login/Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
