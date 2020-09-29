import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      gender: this.props.gender,
      height: this.props.height,
    };
    // this.state.name = this.props.name;
    // this.state.gender = this.props.gender;
    // this.state.height = this.props.height;
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        name: {this.state.name} <br />
        gender: {this.state.gender} <br />
        height: {this.state.height} <br />
      </div>
    );
  }
}

export default User;
