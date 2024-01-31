import React from 'react'
import Header from '../Header/Header'
import './Home.css';
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="content">
        <div className='content-wrapper'>
          <h1>Super Excited Home</h1>
          <p>Welcome to the most exciting place on the web! Get ready for a colorful journey.</p>
          <Link className='links' to={"/signup"}>SignUp</Link>
          <Link className='links' to={"/login"}>Login</Link>
        </div>
      </div>

    </>
  )
}

export default Home