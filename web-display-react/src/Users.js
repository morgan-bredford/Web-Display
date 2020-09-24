import React from 'react'
import User from './User'
import axios from 'axios'

async function getUsers() {
    try {
        const res = await axios.get(
        "https://swapi.dev/api/people/?search=skywalker"
        );
        
        const userstest = res.data.results
        userstest.map( (user) => (
            <User name={user.name} gender={user.gender} height={user.height} />
         ))
        return res.data.results
    } catch (e) {
        console.log(e);
    }
    
}

const users = getUsers()
console.log(typeof users)

function Users(props){
    console.log(props.users)
    //console.log(users)
    return(
        <React.Fragment>
            {props.users.map( (user) => (
               <User name={user.name} gender={user.gender} height={user.height} />
            ))}
        </React.Fragment>
        )
}

export default Users