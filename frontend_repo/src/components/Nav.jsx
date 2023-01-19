import React from "react";
import Logo from '../assets/images/logo.svg';
import "./Nav.css";

function Nav(props){
    return(
    <div>
      <div className="logo">
          <img src={Logo} alt="Logo"/>
     </div>
    </div>     
    );
}

export default Nav;