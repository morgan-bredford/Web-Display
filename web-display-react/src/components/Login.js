import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

function Login(props) {
    const login = (e) => {
        e.preventDefault()
        const user = {username: e.target[0].value, password: e.target[1].value}
        axios
          .get("http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8080/users/find?search="+e.target[0].value)
          .then((res) => {
            if(user.password === res.data[0].password){
              localStorage.setItem('user', JSON.stringify(res.data[0]))
              props.setUser(res.data[0])
              props.setLoggedIn(true)
            }
          })
          .catch(err => console.log(err.response))

      //   axios
      // .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:5000/test")
      // .then((res) => console.log(res))
      // .catch(err => {
      //   console.log(err.response)}) 
      }

    return(
      <>
        { props.loggedIn ? <Redirect to='/' /> : null }
        <div className="formcontainer">
          <form id="login_form" onSubmit={(e) => login(e)}>
          <h1 style={{textAlign: 'center'}}>Logga in</h1>
              <label htmlFor="username">Användarnamn:</label>
              <input type="text" name="username" placeholder="användarnamn" />
              <label htmlFor="password">Lösenord:</label>
              <input type="text" name="password" placeholder="lösenord" />
              <br />
              <button>Logga in</button>
          </form>
        </div>
      </>
    )
}

export default Login