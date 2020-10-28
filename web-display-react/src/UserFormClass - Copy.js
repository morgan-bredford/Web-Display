import React from "react";
import axios from "axios";
import uuid from 'react-uuid'
import './css/userformclass.css'
import Im from './Im'
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const formdata = new FormData(e.target);
    // console.log(formdata.get("gender"));

    axios
      .post("http://127.0.0.1:5000/users/add", this.state)
      .then((res) => console.log(res))
      .catch(err => {
        this.setState({errormsg: 'ERROR!!!!'}) 
        console.log(err.response)})
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  findUser = async (e) => {
    e.preventDefault()

    const ret = await axios
      .get("http://127.0.0.1:5000/users/find?search="+e.target[0].value)
      //.then((res) => this.setState({login: res.data[0].username}))
      .catch(err => {
        //this.setState({errormsg: 'ERROR!!!!'}) 
        console.log(err.response)})

        return ret

  }

  login = (e) => {
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

  render() {
    return (
      <div>
      <div id="formcontainer">
      <form name="createUserForm" onSubmit={this.handleSubmit}>
        <h1>Skapa användare</h1>
        <label htmlFor="username">Användarnamn:</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={this.handleChange}
          placeholder="användarnamn"
        /><br />
        <label htmlFor="password">Lösenord:</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={this.handleChange}
          placeholder="lösenord"
        /><br />
        <label htmlFor="firstname">Förnamn:</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          onChange={this.handleChange}
          placeholder="förnamn"
        /><br />
        <label htmlFor="lastname">Efternamn:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={this.handleChange}
          onFocus={this.testfunc}
          placeholder="efternamn"
        /><br />
        <label htmlFor="gender">Kön:</label>
        <select id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
            <option value="">-Välj-</option>
            <option value="Man">Man</option>
            <option value="Kvinna">Kvinna</option>
            <option value="Annat">Annat</option>
        </select>
        <br />
        <button>Submit</button>
        {this.state.errormsg}
        <br /><br />
        {this.state.name}
        {this.state.gender}
      </form>
      </div>
      <form onSubmit={(e) => this.findUser(e)}>
        <input type="text" name="search" />
        <button />
      </form>
      <form onSubmit={(e) => this.login(e)}>
        <input type="text" name="username" placeholder="name" />
        <input type="text" name="password" placeholder="pass" />
        <button>log in</button>
      </form>
      </div>
    );
  }
}

export default UserFormClass;