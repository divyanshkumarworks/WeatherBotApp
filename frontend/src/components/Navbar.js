import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Weather Bot</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            
            <li className="nav-item btn">
              <Link to="/bot-settings" style={{ textDecoration: 'none' }}>Bot Settings</Link>
            </li>
            <li className="nav-item btn">
              <Link to="/user-management" style={{ textDecoration: 'none' }}>User Management</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;