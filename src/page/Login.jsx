import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../api/auth/login";

export default function Login() {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({ email: "qwe@123.com", password: "qwe123" });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const res = await login(formData.email, formData.password);
          if (res.statusCode === 200) {
               localStorage.setItem("accessToken", res.data.accessToken);
               alert("로그인 되었습니다.");
               navigate("/");
          } else {
               alert(res.message);
          }
     };

     return (
          <Page>
               <Title>로그인</Title>
               <Form onSubmit={handleSubmit}>
                    <Input
                         type="email"
                         name="email"
                         placeholder="이메일"
                         value={formData.email}
                         onChange={handleChange}
                         required
                    />
                    <Input
                         type="password"
                         name="password"
                         placeholder="비밀번호"
                         value={formData.password}
                         onChange={handleChange}
                         required
                    />
                    <Button type="submit">로그인</Button>
                    <SignupButton type="button" onClick={() => navigate("/signup")}>
                         회원가입
                    </SignupButton>
               </Form>
          </Page>
     );
}
const Page = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 400px;
     margin: 4rem auto;
`;

const Title = styled.h2`
     margin-bottom: 2rem;
     text-align: center;
`;

const Form = styled.form`
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;

const Input = styled.input`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
`;

const Button = styled.button`
     padding: 0.75rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
     font-size: 1rem;
`;

const SignupButton = styled(Button)`
     background-color: #f0f0f0;
     color: #333;
     margin-top: 0.5rem;
`;
