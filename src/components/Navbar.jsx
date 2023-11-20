import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {


  return (
    <div className="header-top-fixed one-page-nav  ">
  <div className="container">
    <div className="logo">
      <Link to="/login" className="navbar-brand" href="/">
        <h2 className='title'>Prof. Kiran Talele</h2>
      </Link>
    </div>
    <ul className="main-menu">
      <li>
        <Link  to="/"className="active">Home</Link>
      </li>
      <li>
        <Link to="/about">About Me</Link>
      </li>
      <li>
        <Link to="/project">Projects</Link>
      </li>
    </ul>
  </div>
</div>

    
  )
}

export default Navbar
