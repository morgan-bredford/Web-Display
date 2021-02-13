import React from 'react'


function Welcome(props){
    const logout = () => {
        localStorage.clear();
        props.setUser({});
        props.setLoggedIn(false)
      };

    return(
        <main>
            <h1 style={{textAlign: 'center'}}>Välkommen {props.user[0].username}</h1>
            <button style={{display: 'block',margin: 'auto'}} onClick={logout}>Logga ut</button>
        </main>
    )
}

export default Welcome