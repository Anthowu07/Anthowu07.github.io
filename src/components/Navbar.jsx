import React from 'react';
import './Navbar.css';
import train from '../assets/train.png'

export default function Navbar(){
    return (
        <nav className="nav">
            <a href="/" className="site-title">All a Board</a>
            <img src={train} alt="train"/>
            <ul>
                <li><a href="/boardgames">Board Games</a></li>
                <li><a href="/warehouses">Warehouses</a></li>
                <li><a href="/inventory">Inventory</a></li>
                <li><a href="/orders">Place Order</a></li>
            </ul>
        </nav>
    )
}