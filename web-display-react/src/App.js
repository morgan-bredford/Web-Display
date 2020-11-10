import React, { useState, useEffect } from "react";
import UserPage from './UserPage'
import UserFormClass from "./UserFormClass";
import BuildGallery from "./BuildGallery";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
        <Switch>
          { loggedIn ?
              <Route path="/" exact component={() => <Welcome user={user} setLoggedIn={setLoggedIn} setUser={setUser} />} />
            :
              <Route path="/" exact
              render={() => (
                <UserFormClass setLoggedIn={setLoggedIn} setUser={setUser} loggedIn={loggedIn} />)}
              />
          }
          <Route path="/userpage" exact
            render={() => (
            <UserPage user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />)}
          />
          <Route path="/login" 
          render={() => (
            <Login setLoggedIn={setLoggedIn} setUser={setUser} loggedIn={loggedIn} />)}
          />
          <Route path="/buildgallery" component={() => <BuildGallery user={user} setUser={setUser} loggedIn={loggedIn} /> } />
          <Route path="/gallery" component={() => <Gallery user={user} loggedIn={loggedIn} /> } />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
