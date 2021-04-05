import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import "./Login.css";
import "../Component/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";

function Login(props) {
    const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    };
    return {
      value,
      onChange: handleChange,
    };
  };

  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  const backEndUrl = "https://charge-point.herokuapp.com";

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(`${backEndUrl}/api/users/signin`, {
       username: username.value,
        password: password.value,
        

      }) 
      .then((response) => {
        console.log(username);
        console.log(password);

        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <h2 className="TitleHeading" >
          EVS.<span class="colorTwo">Energy</span>|Charging Dashboard
        </h2>
      </div>
      <div className="login-wrapper">
        <hr className="breakline"></hr>
        <h2> Sign in </h2>
        <div>
          Username
          <br />
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          Password
          <br />
          <input type="password" {...password} autoComplete="new-password" />
        </div>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <input
          type="button"
          className="button"
          value={loading ? "Loading..." : "Login"}
          onClick={handleLogin}
          disabled={loading}
        />
        <br />

        <Footer></Footer>
      </div>
    </div>
  );
}

export default Login;

/*import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';

const backEndUrl = 'http://localhost:5000'; 

async function loginUser(credentials) {
  return fetch(`${backEndUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};*/
