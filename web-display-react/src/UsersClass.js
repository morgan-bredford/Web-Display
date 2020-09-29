import React, { Component } from "react";
import User from "./User";
import axios from "axios";
import { render } from "@testing-library/react";

class UsersClass extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  addUser() {
    this.setState((previousState) => ({
      users: [...previousState.users, { name: "1", gender: "2", height: "23" }],
    }));
  }

  removeUser(id) {
    const newState = this.state.users.filter((user) => user.id !== id);
    console.log(newState);
    this.setState({ users: newState });
    console.log(this.state.users);
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
        <button onClick={() => this.removeUser(3)}>test</button>
      </React.Fragment>
    );
  }
}

export default UsersClass;
