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
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount(){
  //   document.querySelector('nav').style.backgroundImage = 'url(/images/housebwclip.png)'
  // }

  handleSubmit = (e) => {
    e.preventDefault();

    // const formdata = new FormData(e.target);
    // console.log(formdata.get("gender"));

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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  findUser = async (e) => {
    e.preventDefault()

    const ret = await axios
      .get("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/find?search="+e.target[0].value)
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
      <br />
      <h1 style={{textAlign: 'center',fontStyle: 'italic'}}>Välkommen att logga in</h1>
      <br />
      <Login setLoggedIn={this.props.setLoggedIn} setUser={this.props.setUser} loggedIn={this.props.loggedIn} />
      <br /><br />
      <h2 style={{textAlign: 'center',fontStyle: 'italic'}}>eller om du inte redan har ett användarkonto kan du skapa ett här</h2>
      <br />
      <div id="formcontainer">
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
          onFocus={this.testfunc}
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
      <br />
      <Link to='/imagesearch' style={{color: '#000'}} >
      <h2 style={{textAlign: 'center',fontStyle: 'italic'}}>det går även bra att testa galleriet utan att ha ett användarkonto
      <span className="pagelinks" style={{color: '#000', lineHeight: '100%'}}>{"->"}</span></h2>
      </Link>
      </div>
      </div>
    );
  }
}

export default UserFormClass;
