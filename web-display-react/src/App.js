import React, { useState, useEffect } from "react";
import UserPage from './UserPage'
import UsersClass from "./UsersClass";
import fakeusers from "./fakeusers";
import UserForm from "./UserForm";
import UserFormClass from "./UserFormClass";
import ImageSearch from "./imagesearch";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Match from "./match";
import Gallery from "./Gallery";
import Login from './Login'
import Welcome from './Welcome'

function App() {

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect( () => {
    if(localStorage.getItem('user')){
      setLoggedIn(true) 
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  },[])

  return (
    <Router>
      <div className="App"  >
        <Navbar loggedIn={loggedIn} user={user} />
        
        { loggedIn ?
            <Route path="/" exact component={() => <Welcome user={user} setLoggedIn={setLoggedIn} setUser={setUser} />} />
          :
            <Route path="/" exact
            render={() => (
              <UserFormClass setLoggedIn={setLoggedIn} setUser={setUser} />)}
            />
        }
        <Route
          path="/####"
          exact
          component={() => <UsersClass users={fakeusers} />}
        />
        <Route path="/userpage" exact
          render={() => (
          <UserPage user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)}
        />
        <Route path="/login" 
        render={() => (
          <Login setLoggedIn={setLoggedIn} setUser={setUser} loggedIn={loggedIn} />)}
        />
        <Route path="/imagesearch" component={ImageSearch} />
        <Route path="/imagesearch/:id" component={Match} />
        <Route path="/gallery" exact component={Gallery} />
      </div>
    </Router>
  );
}

export default App;
