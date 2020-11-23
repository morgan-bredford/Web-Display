import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import './css/navbar.css'

function Navbar(props) {

  return (
    <nav>
      <ul>
        <NavLink to="/" exact={true}>
          <li>hem</li>
        </NavLink>
        <NavLink to="/buildgallery">
          <li>bygg galleri</li>
        </NavLink>
        <NavLink to="/gallery"><li>Ditt galleri</li></NavLink>
        { 
          props.loggedIn ? <NavLink to="/userpage"><li>{`inloggad som: ${props.user[0].username}`}</li></NavLink> : <NavLink to="/login"><li>logga in</li></NavLink>
        }
      </ul>
      <a href="http://vueapp161120.s3-website.eu-north-1.amazonaws.com">Vue</a>
    </nav>
  );
}

export default Navbar;
