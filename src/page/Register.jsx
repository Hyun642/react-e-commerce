import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled"; // styled import

// 스타일링된 컴포넌트 생성
const RegisterContainer = styled.div`
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 100vh;
     font-family: sans-serif;
     background-color: #f4f4f4;
`;

const RegisterForm = styled.form`
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

const StyledLink = styled(Link)`
     color: #007bff;
     text-decoration: none;

     &:hover {
          text-decoration: underline;
     }
`;

function Register() {
     const [name, setUsername] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [phoneNumber, setphoneNumber] = useState("");
     const navigate = useNavigate();

     const handleRegister = async (e) => {
          e.preventDefault();

          try {
               const response = await axios.post("http://localhost:3001/user/signup", {
                    name,
                    email,
                    password,
                    phoneNumber,
               });

               console.log("회원가입 성공:", response.data);

               alert("회원가입이 성공적으로 완료되었습니다. 로그인 페이지로 이동합니다.");
               navigate("/");
          } catch (error) {
               console.error("회원가입 실패:", error.response.data.message);
               alert(error.response.data.message);
          }
     };

     return (
          <RegisterContainer>
               <FormTitle>회원가입</FormTitle>
               <RegisterForm onSubmit={handleRegister}>
                    <FormGroup>
                         <Label htmlFor="username">이름</Label>
                         <Input
                              type="text"
                              id="username"
                              value={name}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                         />
                    </FormGroup>
                    <FormGroup>
                         <Label htmlFor="email">이메일</Label>
                         <Input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                    <FormGroup>
                         <Label htmlFor="phoneNumber">휴대폰</Label>
                         <Input
                              type="number"
                              id="phoneNumber"
                              value={phoneNumber}
                              onChange={(e) => setphoneNumber(e.target.value)}
                              required
                         />
                    </FormGroup>
                    <Button type="submit">가입하기</Button>
               </RegisterForm>
               <p>
                    <StyledLink to="/">로그인으로 돌아가기</StyledLink>
               </p>
          </RegisterContainer>
     );
}

export default Register;
