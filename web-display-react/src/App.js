import React from "react";
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";
import UserForm from "./UserForm";
import UserFormClass from "./UserFormClass";
import PictureSearch from "./picturesearch";

function App() {
  return (
    <div className="App">
      <PictureSearch />
      <UserFormClass />
      <UsersClass users={fakeusers} />
      <input type="checkbox" />
      <span>check it</span>
    </div>
  );
}

export default App;
