import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { SiCoinmarketcap } from "react-icons/si";

function Headers() {
  return (
    <>
        <div className='navbar'>
            <Link to={'/'} className="logo">
                <h1>CoinMarket </h1>
                <SiCoinmarketcap size={30}/>
            </Link>
            <ul>
                <li><Link to={'/coins'}>Coins</Link></li>
            </ul>
        </div>
    </>
  )
}

export default Headers