import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'

function UserPage(props) {

  const logout = () => {
    localStorage.clear();
    props.setUser({});
    props.setLoggedIn(false)
  };

  return (
    <React.Fragment>
      { 
        props.user[0] ? 
          <div style={{width: '50vw', margin: 'auto'}}>
            <form name="createUserForm">
              <h1>Dina uppgifter</h1>
              <label htmlFor="username">Användarnamn:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={props.user[0].username}
                placeholder="användarnamn"
              /><br />
              <label htmlFor="password">Lösenord:</label>
              <input
                type="text"
                name="password"
                id="password"
                value={props.user[0].password}
                placeholder="lösenord"
              /><br />
              <label htmlFor="firstname">Förnamn:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={props.user[0].firstname}
                placeholder="förnamn"
              /><br />
              <label htmlFor="lastname">Efternamn:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={props.user[0].lastname}
                placeholder="efternamn"
              /><br />
              <label htmlFor="gender">Kön:</label>
              <select id="gender" name="gender" value={props.user[0].gender} >
                  <option value="">{props.user[0].gender}</option>
              </select>
              <br />
            </form>
            <br />
            <Link to="/" >
              <button  onClick={logout}>Logga ut</button>
            </Link>
          </div>
        :<div></div>
      }
    </React.Fragment>
  );
}

export default UserPage;