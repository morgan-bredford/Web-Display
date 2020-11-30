import React from 'react'


function Welcome(props){
    const logout = () => {
        localStorage.clear();
        props.setUser({});
        props.setLoggedIn(false)
      };

    return(
        <main>
            <h1>Välkommen {props.user[0].username}</h1>
            <button  onClick={logout}>Logga ut</button>
        </main>
    )
}

export default Welcome