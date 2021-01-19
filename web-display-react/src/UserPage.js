import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

function UserPage(props) {
  const [form, setForm] = useState({})

  //Inserts user info into the page form 
  useEffect( () => {
    setForm(props.user[0])
    //props.setUser([form])
  },[])
  
  const handleChange = (e) => {
    //props.setUser([{ [e.target.name]: e.target.value }]);
    setForm({...form, [e.target.name]: e.target.value })
  }

  //Updates the user and saves it 
  const submitHandler = (e) => {
    e.preventDefault()
    props.setUser([form])

    axios
      .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/update", [form])
      .then((res) => { 
        console.log(res)
        localStorage.setItem('user', JSON.stringify([form]))
      })
      .catch(err => {
        console.log(err.response.data.message)})
    
    console.log(form)
  }

  const logout = () => {
    localStorage.clear();
    props.setUser({});
    props.setLoggedIn(false)
  };

  return (
    <main>
      <br /><br />
      { !props.loggedIn ? <Redirect to='/' /> : null }
      { 
        props.user[0] ? 
          <div style={{width: '30vw', margin: 'auto'}}>
            <form onSubmit={submitHandler}>
              <h1 style={{fontSize: '2vw'}} >Redigera dina uppgifter</h1>
              <label htmlFor="username">Användarnamn:</label>
              <div
                id="username"
               >{form.username}
              </div>
              <label htmlFor="password">Lösenord:</label>
              <input
                type="text"
                name="password"
                id="password"
                defaultValue={form.password}
                placeholder="lösenord"
                onChange={handleChange}
              />
              <label htmlFor="firstname">Förnamn:</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={form.firstname}
                placeholder="förnamn"
                onChange={handleChange}
              />
              <label htmlFor="lastname">Efternamn:</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={form.lastname}
                placeholder="efternamn"
                onChange={handleChange}
              />
              <label htmlFor="gender">Kön:</label>
              <select id="gender" name="gender" defaultValue={form.gender} onChange={handleChange} >
                <option value={form.gender}>{form.gender}</option>
                <option value="Man">Man</option>
                <option value="Kvinna">Kvinna</option>
                <option value="Annat">Annat</option>
              </select>
              <button style={{width: '6vw',height: '6vw',margin: '2vh auto 0',padding: '0px',fontSize:'.85vw',borderRadius: '50%'}}>Uppdatera</button>
            </form>
            <br />
            <Link to="/" >
              <button  onClick={logout}>Logga ut</button>
            </Link>
          </div>
        :<div></div>
      }
    </main>
  );
}

export default UserPage;