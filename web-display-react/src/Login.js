import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

function Login(props) {
    const login = (e) => {
        e.preventDefault()
        const user = {username: e.target[0].value, password: e.target[1].value}
        axios
          .get("http://13.48.204.0:80/users/find?search="+e.target[0].value)
          .then((res) => {
            if(user.password === res.data[0].password){
              localStorage.setItem('user', JSON.stringify(res.data))
              props.setUser(res.data)
              props.setLoggedIn(true)
            }
          })
          .catch(err => console.log(err.response))
      }

    return(
      <div>
        { props.loggedIn ? <Redirect to='/' /> : null }
        <div id="formcontainer">
          <form onSubmit={(e) => login(e)}>
              <label htmlFor="username">Användarnamn:</label>
              <input type="text" name="username" placeholder="name" />
              <label htmlFor="password">Lösenord:</label>
              <input type="text" name="password" placeholder="pass" />
              <button>Logga in</button>
          </form>
        </div>
      </div>
    )
}

export default Login