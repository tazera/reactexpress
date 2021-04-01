import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
//import Footer from './Component/Footer';

import PrivateRoute from './Utils/PrivateRoute';
//import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


const backEndUrl = 'http://localhost:5000'; 

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
      {/* <BrowserRouter>
        <Switch>
        <Route path="/">
            <Login />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>
         
        </Switch>
      </BrowserRouter> */}


     <BrowserRouter>
           <div className="content">
            <Switch>
              <Route path="/" exact component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
      </BrowserRouter>  
     {/* <Footer/> */}
     </div>

  );
 
}

export default App;



{/* <div className="header">
<NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
<NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
</div>  */}

































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