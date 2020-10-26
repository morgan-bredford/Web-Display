import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import './css/index.css'

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
function MyTestf() {
  return (
    <section>
      <h1>Hello</h1>
      <p>this is a paragraf</p>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </section>
  );
}

const users = [
  { name: "werwerwe", gender: "male", height: "175" },
  { name: "werwerwe", gender: "male", height: "175" },
  { name: "werwerwe", gender: "male", height: "175" },
];

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
