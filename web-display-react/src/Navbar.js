import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/navbar.css'

function Navbar(props) {

  return (
    <nav>
      {console.log(`nav: ${props.loggedIn}`)}
      <ul>
        <Link to="/">
          <li>hem</li>
        </Link>
        <Link to="/imagesearch">
          <li>bygg galleri</li>
        </Link>
  { props.loggedIn ? <Link to="/userpage"><li>placeholder</li></Link> : <Link to="/login"><li>logga in</li></Link>
        
        }
      </ul>
    </nav>
  );
}

export default Navbar;
