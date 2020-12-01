import React from "react";
import { NavLink } from "react-router-dom";
import './css/navbar.css'

function Navbar(props) {

  return (
    <nav>
      <ul>
        <NavLink to="/" exact={true}>
          <li>hem<img src="/images/react_logo_small.png" className="navimg" alt="logo"/></li>
        </NavLink>
        <NavLink to="/buildgallery">
          <li>bygg galleri<img src="/images/react_logo_small.png" className="navimg" alt="logo"/></li>
        </NavLink>
        <NavLink to="/gallery"><li>Ditt galleri<img src="/images/react_logo_small.png" className="navimg" alt="logo"/></li></NavLink>
        { 
          props.loggedIn ? <NavLink to="/userpage"><li>{`inloggad som: ${props.user[0].username}`}<img src="/images/react_logo_small.png" className="navimg" alt="logo"/></li></NavLink> : <NavLink to="/login"><li>logga in<img src="/images/react_logo_small.png" className="navimg"/></li></NavLink>
        }
      </ul>
      <div id="vue_link">
       
          <img src="../images/vue.ico" id="vue_link_img"  alt="logo"/>
            <a href="http://vueapp161120.s3-website.eu-north-1.amazonaws.com/" style={{margin: '0'}}>
              <div id="vue_link_text">Vue versionen</div>
            </a>
      </div>
    </nav>
  );
}

export default Navbar;
