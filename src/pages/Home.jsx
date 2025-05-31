import React from 'react'
import { Link } from 'react-router-dom'
import devImg from '../media/web-dev.jpeg'
import { GiClothes, GiMeal, GiSoap, GiNotebook, GiHouse,} from 'react-icons/gi'
import fashionImg from '../media/fashion-BC.jpeg'
import { FaBed, FaConciergeBell, FaLaptop,} from 'react-icons/fa'


const Home = () => {
  return (
    <div className='home'>

      <section className='section1'>
        <h2>Welcome to Unilag Yard</h2>
        <p className='pp'>Your one stop shop for all</p>
        <p>Buy, sell and connect with students from anywhere in Unilag.</p>
        <div className='section1-flex'>
          <Link to='/allProducts' className='section1-Link'>Start shopping</Link>
          <Link to='/howItWorks' className='section1-Link'>How it works</Link>
        </div>
      </section>

      <section className='section2'>
        <h3>Featured Products</h3>
        <div className='link1'><Link to='/howItWorks' className='section2-Link'>Learn more</Link></div>
        <div className='section2-flex'>
          <div className='card'>
          <img src={devImg} alt="Web Developer" />
          <h3>Web Developer</h3>
          <p>Bringing your dream website to reality.</p>
          <p>Category: Services</p>
          <button>View Full</button>
        </div>
        <div className='card'>
          <img src={fashionImg} alt="fashion Store" />
          <h3>Fashion House</h3>
          <p>Get quality and affordable fashion kits.</p>
          <p>Category: Clothing & Fashion</p>
          <button>View Full</button>
        </div>
        </div>
      </section>
      
      <section3 >
        <h3 className='section3-h3'>Category</h3>
        <div className='section3'>
          <Link >
          <div className='div'>
            <GiClothes size={40} color='white'/>
            <p>Clothing</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <GiMeal size={40} color='white'/>
            <p>Food</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <GiSoap size={40} color='white'/>
            <p>SkinCare</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <FaLaptop size={40} color='white'/>
            <p>Electronics</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <FaConciergeBell size={40} color='white'/>
            <p>Services</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <FaBed size={40} color='white'/>
            <p>Room Essentials</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <GiNotebook size={40} color='white'/>
            <p>Study Aids</p>
          </div>
        </Link>
        <Link>
          <div className='div'>
            <GiHouse size={40} color='white'/>
            <p>Hostels</p>
          </div> 
        </Link>
        </div>
      </section3> 

    </div>
  )
}

export default Home
