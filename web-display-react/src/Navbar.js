import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
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
    </nav>
  );
}

export default Navbar;
