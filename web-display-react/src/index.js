import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Test from "./Test";
import User from "./User";
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
function getUsers() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=3")
    .then((res) => {
      console.log(res.data);
    });
}
getUsers();

ReactDOM.render(
  <React.StrictMode>
    getUsers();
    <Test />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
