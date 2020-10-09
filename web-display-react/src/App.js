import React from "react";
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";
import UserForm from "./UserForm";
import UserFormClass from "./UserFormClass";
import ImageSearch from "./imagesearch";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Match from "./match";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={UserFormClass} />
        <Route
          path="/"
          exact
          component={() => <UsersClass users={fakeusers} />}
        />
        <Route path="/imagesearch" component={ImageSearch} />
        <Route path="/imagesearch/:id" component={Match} />
        <input type="checkbox" />
        <span>check it</span>
      </div>
    </Router>
  );
}

export default App;
