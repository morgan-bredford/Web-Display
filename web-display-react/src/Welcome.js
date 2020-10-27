import React from 'react'

function Welcome(props){
    const logout = () => {
        localStorage.clear();
        this.props.setUser({});
        this.props.setLoggedIn(false)
      };

    return(
        <React.Fragment>
            <h1>Välkommen tillbaka {props.user[0].username}</h1>
            <button  onClick={logout}>Logga ut</button>
        </React.Fragment>
    )
}

export default Welcome