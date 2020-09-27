import React, { Component } from 'react'
import User from './User'
import axios from 'axios'
import { render } from '@testing-library/react'


class UsersClass extends Component{
    
    constructor(){
        super()
        this.state = {
            users: [{name: "dfgdfg", gender:"male", height:"175"},{name: "hjkh", gender:"male", height:"175"},{name: "lälk", gender:"male", height:"175"}]
        }
    
        
    const users2 = [{name: "aaaa", gender:"male", height:"175"},{name: "sssss", gender:"male", height:"175"},{name: "ddddd", gender:"male", height:"175"}]
    this.testb = this.testb.bind(this)

    //testc = (e) => { console.log('testccc') }
    }

    testb(e){
        console.log(this.users2)
        return <UsersClass users={[{name: "aaaa", gender:"male", height:"175"},{name: "sssss", gender:"male", height:"175"},{name: "ddddd", gender:"male", height:"175"}]} />
    }

    componentDidMount()
    {

    //     async function getUsers() {
    //     try {
    //         const res = await axios.get(
    //         "https://swapi.dev/api/people/?search=skywalker"
    //         );
    //         console.log(res.data.results)
    //         // const userstest = res.data.results
    //         // userstest.map( (user) => (
    //         //     <User name={user.name} gender={user.gender} height={user.height} />
    //         //  ))
    //         this.setState({ users: res.data.results })
    //         console.log(this.state.users)
    //     } catch (e) {
    //         console.log(e);
    //     }
    //     }
    // getUsers()
    axios.get("https://swapi.dev/api/people/?search=skywalker").then(
        res => this.setState({users: res.data.results})
    ).then(console.log(this.state.users))
    // 
//    setTimeout(
//        () => {
//        this.setState({users: [{name: "werwerwe", gender:"male", height:"175"},{name: "werwerwe", gender:"male", height:"175"},{name: "werwerwe", gender:"male", height:"175"}]})
//        console.log(this.state.users)
//    }, 3000);
}


    render()
    
        {
            return(
            <React.Fragment>
                {this.props.users.map( (user) => (
                <User name={user.name} gender={user.gender} height={user.height} />
                ))}
                {console.log(this.state.users)}
                {this.state.users.map( (user) => (
                <User name={user.name} gender={user.gender} height={user.height} />
                ))}   
                <button onClick = {this.testb} >test</button>       
            </React.Fragment>
            )
    }
}

export default UsersClass