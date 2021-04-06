import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


const backEndUrl = 'https://charge-point.herokuapp.com'; 

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`${backEndUrl}/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
    
     <BrowserRouter>
           <div className="content">
            <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
      </BrowserRouter>  
     
     </div>

  );
 
}

export default App;


































/*import React, { useState } from 'react';
import './App.css';
import Users from './Component/Users/Users';
import Login from './Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/dashboard';
import Preferences from './Preferences/Preferences';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {  
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;*/