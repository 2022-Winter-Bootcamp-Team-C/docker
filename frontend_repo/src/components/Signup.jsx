import React, { useState } from 'react';
import LoginButton from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import "./Signup.css";
import {useNavigate} from "react-router-dom";
import axios from 'axios';


function Signup(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const register = () => {
    axios.post('http://127.0.0.1:8000/api/v1/user/new/',
    {
      email: email,
      password: password,
    })
    .then((response)=> {
      console.log("회원가입 성공!");
      alert("회원가입을 환영합니다!");
      setTimeout(()=> {
        navigate("/login");
      }, 1000);
    })
    .catch(function(error) {
    console.log("회원가입 실패!");
    console.log(error);
    });
  }

return(
    <div className="ml" >
    <Form>
    <h1>SIGNUP</h1>

      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>이메일</Form.Label>
        <Form.Control type="email" placeholder="이메일" onChange={(e)=>{setEmail(e.target.value);}}/> {/*onChange={(e)=>{setEmail(e.target.value);}}*/}
        <Form.Text className="text-muted" ></Form.Text>
      </Form.Group>
      

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호" onChange={(e)=>{setPassword(e.target.value);}}/>{/*onChange={(e)=>{setPassword(e.target.value);}}*/}
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      {/* <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control type="verifypassword" placeholder="비밀번호" />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicCheckbox">
      </Form.Group> */}
      
      <LoginButton variant="primary three" onClick={() => {register()}} >회원가입</LoginButton>{''}
    </Form>
    </div>
     )
    
  }



export default Signup;
