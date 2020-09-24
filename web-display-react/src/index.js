import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Test from "./Test";
import User from "./User";
import Users from "./Users";
import axios from "axios";

// async function getUsers() {
//   try {
//     const res = await axios.get(
//       "https://swapi.dev/api/people/?search=skywalker"
//     );
//     console.log(typeof res.data);
//     res.map((user) => {
//       // return (
//       //   <User name={user.name} gender={user.gender} heigth={user.height} />
//       // );
//       console.log(user);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }
// function getUsers() {
//   axios.get("https://swapi.dev/api/people/?search=skywalker").then((res) => {
//     console.log(res.data);
//   });
// }
// function getUsers() {
//   axios
//     .get("https://jsonplaceholder.typicode.com/todos?_limit=3")
//     .then((res) => {
//       res.data.map(result => console.log(result))
//     });
// }
// getUsers();

const users = [{name: "werwerwe", gender:"male", height:"175"},{name: "werwerwe", gender:"male", height:"175"},{name: "werwerwe", gender:"male", height:"175"}]

ReactDOM.render(
  <React.StrictMode>
    <Users users={users} />
    <Test />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
