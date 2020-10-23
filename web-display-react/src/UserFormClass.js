import React from "react";
import axios from "axios";
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
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const formdata = new FormData(e.target);
    // console.log(formdata.get("gender"));

    axios
      .post("http://127.0.0.1:5000/users/add", this.state)
      .then((res) => console.log(res));
  }

  handleChange(e) {
    console.log(`namn: ${e.target.name} value: ${e.target.value}`)
    this.setState({ [e.target.name]: e.target.value });
  }

  testfunc = () => console.log('testfunc')

  render() {
    return (
      <form name="createUserForm" onSubmit={this.handleSubmit}>
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
          name="name"
          id="firstname"
          onChange={this.handleChange}
          placeholder="förnamn"
        /><br />
        <label htmlFor="lastname">Efternamn:</label>
        <input
          type="text"
          name="gender"
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
        <br /><br />
        {this.state.name}
        {this.state.gender}
      </form>
    );
  }
}

export default UserFormClass;
