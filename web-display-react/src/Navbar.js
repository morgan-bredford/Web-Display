import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/navbar.css'

function Navbar(props) {

  return (
    <nav>
      <ul>
        <Link to="/">
          <li>hem</li>
        </Link>
        <Link to="/buildgallery">
          <li>bygg galleri</li>
        </Link>
        <Link to="/gallery"><li>Ditt galleri</li></Link>
        { 
          props.loggedIn ? <Link to="/userpage"><li>{`inloggad som: ${props.user[0].username}`}</li></Link> : <Link to="/login"><li>logga in</li></Link>
        }
      </ul>
      
    </nav>
  );
}

export default Navbar;
