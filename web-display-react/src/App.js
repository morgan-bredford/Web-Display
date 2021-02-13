import React, { useState, useEffect } from "react";
import UserPage from './components/UserPage'
import UserFormClass from "./components/UserFormClass";
import BuildGallery from "./components/BuildGallery";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Gallery from "./components/Gallery";
import Login from './components/Login'
import Welcome from './components/Welcome'
import ImageTest from './ImageTest'
import TsQuiz from "./TsQuiz";

function App() {
// Setup storing user info and if they are logged in.
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

// If the user using this browser didn't log out at the end of their last session then get their info from local storage and set it as current user
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
         {/* Setup switch so any invalid url redirects to main page  */}
        <Switch>
          {/* Checks if user is logged in and redirects accordingly */}
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
          <Route path="/quiz" component={() => <TsQuiz user={user} loggedIn={loggedIn} /> } />
          <Route path="/test" component={() => <ImageTest  user={user}/> } />
          {/* Redirects to main page if url extension is invalid */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
