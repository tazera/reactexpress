import React, { Component } from 'react';
import './Users.css';

const backEndUrl = 'http://localhost:5000'; 
//process.env.BACKEND_URL


class Users extends Component {
    constructor(){
        super();
        this.state = {
            users: []
        }
    }
      
    componentDidMount(){
        console.log("inside handleGetJson");
        fetch(`${backEndUrl}/api/users`)
        .then(res => res.json())
        .then(users => this.setState({users: users}, () => console.log('Customers fetched..',
        users)));
    }
  
  render () {
    return (
      <div >
       <h2>Customers</h2>
        <ul>
          {this.state.users.map(users => 
            <li key= {users.id}>{ users.username} { users.password}  </li>)}
        </ul>

    </div>
    );
  }
}

export default Users;


