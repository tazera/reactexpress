import React from "react";
import { getUser, removeUserSession } from "../Utils/Common";
import "./Dashboard.css";
import "../Component/Footer.css";
import Footer from "../Component/Footer";
import axios from "axios";
import { render } from "react-dom";

const backEndUrl = "http://localhost:5000";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      locations: []
    };
  }

  componentDidMount() {
   let user = getUser();
   let locations = [];
   axios.get(`${backEndUrl}/locations`).then((response) => {
    locations = [...response.data];
   })
   .catch((error) => {
       console.log(error)
   });
 
   
    this.setState({
     user, locations });
  }

  // handle click event of logout button
   handleLogout = () => {
    removeUserSession();
    this.props.history.push("/");
  };

  
render() {

 const {user, locations} = this.state;
  return (

    <div>
      <div>
        <h2 className="TitleHeading">
          EVS.<span className="colorTwo">Energy</span>|Charging Dashboard
        </h2>
      </div>
      <div className="login-wrapper">
      <hr className="breakline"></hr>
        <h2>Welcome {user.name}!</h2>
        <div className="Table">
        <ul>
          {locations.map((location, index) =>
          <li key={index}><p>{location.name}</p></li>)}    
        </ul>
        </div>
        <input type="button" className="button" onClick={() => this.handleLogout()} value="Logout" />
    
        <Footer />
      </div>
    </div>
  );
}
}

export default Dashboard;

// import React from 'react';

// export default function Dashboard() {
//   return(
//     <h2>Dashboard</h2>
//   );
// }
