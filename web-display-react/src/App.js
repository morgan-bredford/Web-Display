import React from "react";
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";
import UserForm from "./UserForm"

function App() {
  return (
    <div className="App">
      <UserForm />
      <UsersClass users={fakeusers} />
      <input type="checkbox" />
      <span>check it</span>
    </div>
  );
}

export default App;
