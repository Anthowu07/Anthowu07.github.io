import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import train from '../assets/train.png';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">All a Board</Link>
      <img src={train} alt="train" />
      <ul>
        <li><Link to="/boardgames">Board Games</Link></li>
        <li><Link to="/warehouses">Warehouses</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/orders">Place Order</Link></li>
      </ul>
    </nav>
  );
}
