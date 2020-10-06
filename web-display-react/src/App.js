import React from "react";
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";
import UserForm from "./UserForm";
import UserFormClass from "./UserFormClass";

function App() {
  return (
    <div className="App">
      <UserFormClass />
      <UsersClass users={fakeusers} />
      <input type="checkbox" />
      <span>check it</span>
    </div>
  );
}

export default App;
