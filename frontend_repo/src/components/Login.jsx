import React, { useState } from 'react';
import LoginButton from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import "../components/css/Login.css"
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const checkUser = () => {
    axios.post('https://www.smtm.kr/api/v1/user/login/',
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    })
    .then((response)=> {
      console.log("로그인 성공!");
      alert("로그인을 환영합니다!");
      console.log(response.data)
      localStorage.clear()
      localStorage.setItem('user_id', response.data.user_id)
      localStorage.setItem('email', response.data.email)
            setTimeout(()=> {
              navigate("/dashboard");
            }, 1000);
    })
    .catch(function(error) {
    alert("이메일과 비밀번호를 다시 확인해주세요!")
    console.log("로그인 실패!");
    console.log(error);
    });
  }

  return (

    <div className="ml">
    <Form>
    <h1>LOGIN</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이메일</Form.Label>
        <Form.Control type="email" placeholder="이메일" onChange={(e)=>{setEmail(e.target.value);}}/>
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호" onChange={(e)=>{setPassword(e.target.value);}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      
      <LoginButton variant="primary one" onClick={checkUser}>로그인</LoginButton>{' '}
      <LoginButton variant="primary two" onClick={navigateToSignup}>회원가입</LoginButton>{' '}
     
    </Form>
    </div>
  );
}



export default Login;