import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled"; // styled import

function Login() {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const navigate = useNavigate();

     const handleLogin = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post("http://localhost:3001/auth/login", {
                    username,
                    password,
               });
               console.log("로그인 성공:", response.data);
               navigate("/main");
          } catch (error) {
               console.error("로그인 실패:", error);
               alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
          }
     };

     return (
          <LoginContainer>
               <LoginForm onSubmit={handleLogin}>
                    <FormTitle>로그인</FormTitle>
                    <FormGroup>
                         <Label htmlFor="username">이름</Label>
                         <Input
                              type="text"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                         />
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="password">비밀번호</Label>
                         <Input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                    </FormGroup>
                    <Button type="submit">로그인</Button>
               </LoginForm>
               <RegisterLinkContainer>
                    <p>
                         계정이 없으신가요? <StyledLink to="/register">회원가입</StyledLink>
                    </p>
               </RegisterLinkContainer>
          </LoginContainer>
     );
}

const LoginContainer = styled.div`
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100vh;
     font-family: sans-serif;
     background-color: #f4f4f4;
`;

const LoginForm = styled.form`
     background: white;
     padding: 30px;
     border-radius: 8px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     width: 300px;
`;

const FormTitle = styled.h2`
     text-align: center;
     margin-bottom: 20px;
`;

const FormGroup = styled.div`
     margin-bottom: 15px;
`;

const Label = styled.label`
     display: block;
     margin-bottom: 5px;
     font-weight: bold;
`;

const Input = styled.input`
     width: 100%;
     padding: 10px;
     border: 1px solid #ccc;
     border-radius: 4px;
`;

const Button = styled.button`
     width: 100%;
     padding: 12px;
     background-color: #007bff;
     color: white;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     font-size: 16px;

     &:hover {
          background-color: #0056b3;
     }
`;

const RegisterLinkContainer = styled.div`
     text-align: center;
     margin-top: 15px;
`;

const StyledLink = styled(Link)`
     color: #007bff;
     text-decoration: none;

     &:hover {
          text-decoration: underline;
     }
`;

export default Login;
