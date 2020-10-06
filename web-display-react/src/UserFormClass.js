import React from "react";
import axios from "axios";
// import UserForm from 'react-hook-form'
// const {register,handleSubmit,errors} = useForm()

class UserFormClass extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "",
      height: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    // const formdata = new FormData(e.target);
    // console.log(formdata.get("gender"));

    axios
      .post("http://127.0.0.1:5000/users/add", this.state)
      .then((res) => console.log(res));

    // console.log(e.target.elements["gender"].value)
    // console.log(e.target.elements.length)
    // for(let i = 0; i<e.target.elements.length ; i++){
    //     console.log(e.target.elements[i].value)
    // }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form name="createUserForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          placeholder="name"
        />
        <input
          type="text"
          name="gender"
          onChange={this.handleChange}
          placeholder="gender"
        />
        <input
          type="text"
          name="height"
          onChange={this.handleChange}
          placeholder="height"
        />
        <textarea />
        <button>Submit</button>
        {this.state.name}
      </form>
    );
  }
}

export default UserFormClass;
