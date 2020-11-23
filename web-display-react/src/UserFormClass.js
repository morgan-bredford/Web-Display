import React from "react";
import axios from "axios";
import uuid from 'react-uuid'
import './css/userformclass.css'
import Im from './Im'
import Login from './Login'
import { Link } from 'react-router-dom'

// import UserForm from 'react-hook-form'
// const {register,handleSubmit,errors} = useForm()

class UserFormClass extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      key: uuid(),
      errormsg: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/add", this.state)
      .then((res) => { 
        const user = [{username: this.state.username,password: this.state.password,firstname: this.state.firstname,lastname: this.state.lastname,gender: this.state.gender,galleryimages: []}]
        localStorage.setItem('user', JSON.stringify(user))
        this.props.setUser(user)
        this.props.setLoggedIn(true)
      })
      .catch(err => {
        this.setState({errormsg: err.response.data.message}) 
        console.log(err.response.data.message)})
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="home_main">
        <Login setLoggedIn={this.props.setLoggedIn} setUser={this.props.setUser} loggedIn={this.props.loggedIn} />
        <div className="skip_login">testa utan att logga in</div>
        <div className="formcontainer">
          <form name="createUserForm" onSubmit={this.handleSubmit}>
            <h1 style={{textAlign: 'center'}}>Skapa användare</h1>
            <br />
            <h5 style={{textAlign: 'center',fontStyle: 'italic',opacity: '0.5'}}>----------------obligatoriskt------------------</h5>
            <label htmlFor="username">Användarnamn:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={this.handleChange}
              placeholder="användarnamn"
            />
            <div className="errormsg">{this.state.errormsg}</div>
            <label htmlFor="password">Lösenord:</label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={this.handleChange}
              placeholder="lösenord"
            />

            <h5 style={{textAlign: 'center',fontStyle: 'italic',opacity: '0.5'}}>----------------frivilligt------------------</h5>
            <label htmlFor="firstname">Förnamn:</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={this.handleChange}
              placeholder="förnamn"
            />
            <label htmlFor="lastname">Efternamn:</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={this.handleChange}
              placeholder="efternamn"
            />
            <label htmlFor="gender">Kön:</label>
            <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                <option value="">-Välj-</option>
                <option value="Man">Man</option>
                <option value="Kvinna">Kvinna</option>
                <option value="Annat">Annat</option>
            </select>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserFormClass;
