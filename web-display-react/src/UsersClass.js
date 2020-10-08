import React, { Component } from "react";
import User from "./User";
import axios from "axios";
import { render } from "@testing-library/react";
import fakeusers2 from "./fakeusers2";

class UsersClass extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.nodetest = this.nodetest.bind(this);
  }

  async addUser() {
    await this.setState((previousState) => ({
      users: [...previousState.users, { name: "1", gender: "2", height: "23" }],
    }));

    let formdata = new FormData();
    //formdata.append("data", JSON.stringify(this.state.users));
    // axios({
    //   method: "post",
    //   url: "http://127.0.0.1:5000",
    //   data: formdata,
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios
      .post(
        "http://127.0.0.1:5000/users/add",
        JSON.stringify({ name: "1", gender: "2", height: "23" })
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeUser(id) {
    const newState = this.state.users.filter((user) => user.id !== id);
    console.log(newState);
    this.setState({ users: newState });
    console.log(this.state.users);
  }

  nodetest() {
    axios
      .get("http://127.0.0.1:5000/?test=test")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // .then(console.log(this.state.users));
  }

  // componentDidMount() {
  //   // axios
  //   //   .get("https://swapi.dev/api/people/?search=skywalker")
  //   //   .then((res) => this.setState({ users: res.data.results }))
  //   //   .then(console.log(this.state.users));

  //   // this.setState({ users: this.props.users });

  //   axios
  //     .get("http://127.0.0.1:5000/users")
  //     .then((res) => this.setState({ users: res.data }));
  // }

  bdtest = () => {
    axios
      .get("http://127.0.0.1:5000/")
      //.then((res) => JSON.parse(res.data))
      .then((jsonres) => console.log(jsonres.data));
  };
  // componentDidUpdate() {
  //   this.setState({ users: fakeusers2 });
  // }

  render() {
    return (
      <React.Fragment>
        {this.state.users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            gender={user.gender}
            height={user.height}
          />
        ))}
        <button onClick={this.bdtest}>test</button>
        <button onClick={() => this.removeUser(3)}>test</button>
        <button onClick={this.nodetest}>test</button>
      </React.Fragment>
    );
  }
}

export default UsersClass;
