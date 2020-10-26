import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    const login = (e) => {
        e.preventDefault()
        const user = {username: e.target[0].value, password: e.target[1].value}
        axios
          .get("http://127.0.0.1:5000/users/find?search="+e.target[0].value)
          .then((res) => {
            if(user.password === res.data[0].password){
              localStorage.setItem('user', JSON.stringify(res.data))
              //this.props.setUser(res.data)
              this.props.setLoggedIn(true)
              this.props.setUser(res.data)
            }
          })
          .catch(err => {
            //this.setState({errormsg: 'ERROR!!!!'}) 
            console.log(err.response)})
      }

    return(
        <div id="formcontainer">
        <form onSubmit={(e) => this.login(e)}>
            <label htmlFor="username">Användarnamn:</label>
            <input type="text" name="username" placeholder="name" />
            <label htmlFor="password">Lösenord:</label>
            <input type="text" name="password" placeholder="pass" />
            <button>Logga in</button>
        </form>
        </div>
    )
}

export default Login