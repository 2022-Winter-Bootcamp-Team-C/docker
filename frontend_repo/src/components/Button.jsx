import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Button.css"

const Button = () => {
  const navigate = useNavigate();
  const navigateToMove = () => {
    navigate("/login");
    
  };

    
  return (
    <div className='button_p'>
        <button className="button_s jittery" onClick={navigateToMove}>시작하기</button> 
    </div>
    )
  }
export default Button;