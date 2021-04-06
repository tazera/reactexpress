import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../Utils/Common";
import "./Login.css";
import "../Component/Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Component/Footer";
import Config from "./Config";
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

  const backEndUrl = "https://charge-point.herokuapp.com/api";
  
   
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