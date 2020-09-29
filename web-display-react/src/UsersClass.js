import React, { Component } from "react";
import User from "./User";
import axios from "axios";
import { render } from "@testing-library/react";
import fs from "fs";

class UsersClass extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };

    this.addUser = this.addUser.bind(this);
    ("");
  }

  addUser() {
    this.setState((previousState) => ({
      users: [...previousState.users, { name: "1", gender: "2", height: "23" }],
    }));
  }

  componentDidMount() {
    // axios
    //   .get("https://swapi.dev/api/people/?search=skywalker")
    //   .then((res) => this.setState({ users: res.data.results }))
    //   .then(console.log(this.state.users));

    this.setState({ users: this.props.users });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            gender={user.gender}
            height={user.height}
          />
        ))}
        {console.log(this.state.users)}
        {this.state.users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            gender={user.gender}
            height={user.height}
          />
        ))}
        <button onClick={this.addUser}>test</button>
      </React.Fragment>
    );
  }
}

export default UsersClass;
