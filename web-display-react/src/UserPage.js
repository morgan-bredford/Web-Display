import { render } from "@testing-library/react";
import React, { Component, useState } from "react";
import { Link, Redirect } from 'react-router-dom'

class UserPage extends Component {

  logout = () => {
    localStorage.clear();
    this.props.setUser({});
    this.props.setLoggedIn(false)
  };

  render(){
    //console.log(`userpage: ${props.user}`)
    return (
      <div>
  
        <Link to="/">
          <button onClick={this.logout}>Logga ut</button>
        </Link>
  { this.props.user[0] ? <div id="formcontainer">
        <form name="createUserForm">
          <h1>Dina uppgifter</h1>
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={this.props.user[0].username}
           
            placeholder="användarnamn"
          /><br />
          <label htmlFor="password">Lösenord:</label>
          <input
            type="text"
            name="password"
            id="password"
            value={this.props.user[0].password}
            
            placeholder="lösenord"
          /><br />
          <label htmlFor="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={this.props.user[0].firstname}
            
            placeholder="förnamn"
          /><br />
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={this.props.user[0].lastname}
            
            onFocus={this.testfunc}
            placeholder="efternamn"
          /><br />
          <label htmlFor="gender">Kön:</label>
          <select id="gender" name="gender" value={this.props.user[0].gender} >
              <option value="">-Välj-</option>
              <option value="Man">Man</option>
              <option value="Kvinna">Kvinna</option>
              <option value="Annat">Annat</option>
          </select>
          <br />
          
        </form>
        
     </div>
    : <div></div>}</div>
    );
  }
}

export default UserPage;