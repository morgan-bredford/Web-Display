import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'

function UserPage(props) {
  const [form, setForm] = useState({})

  useEffect( () => {
    setForm(props.user[0])
  },[])
  

  const logout = () => {
    localStorage.clear();
    props.setUser({});
    props.setLoggedIn(false)
  };

  return (
    <React.Fragment>
      { !props.loggedIn ? <Redirect to='/' /> : null }
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
                defaultValue={props.user[0].password}
                placeholder="användarnamn"
              /><br />
              <label htmlFor="password">Lösenord:</label>
              <input
                type="text"
                name="password"
                id="password"
                defaultValue={props.user[0].password}
                placeholder="lösenord"
              /><br />
              <label htmlFor="firstname">Förnamn:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={props.user[0].firstname}
                placeholder="förnamn"
              /><br />
              <label htmlFor="lastname">Efternamn:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={props.user[0].lastname}
                placeholder="efternamn"
              /><br />
              <label htmlFor="gender">Kön:</label>
              <select id="gender" name="gender" defaultValue={props.user[0].gender} >
                <option value="Man">Man</option>
                <option value="Kvinna">Kvinna</option>
                <option value="Annat">Annat</option>
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