import React from "react";
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";

function App() {
  return (
    <div className="App">
      <UsersClass users={fakeusers} />
      <input type="checkbox" />
      <span>check it</span>
    </div>
  );
}

export default App;
