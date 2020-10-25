import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {

  return (
    <nav>
      {console.log(`nav: ${props.loggedIn}`)}
      <ul>
        <Link to="/">
          <li>home</li>
        </Link>
        <Link to="/imagesearch">
          <li>images</li>
        </Link>
  { props.loggedIn ? <Link to="/userpage"><li>placeholder</li></Link> : null
        
        }
      </ul>
    </nav>
  );
}

export default Navbar;
