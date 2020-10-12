import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const style = {
    width: '100px',
    height: '100px',
    background: 'black'
  }
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>home</li>
        </Link>
        <Link to="/imagesearch">
          <li>images</li>
        </Link>
      </ul>
      <div style={style} id='xydiv'></div>
    </nav>
  );
}

export default Navbar;
