import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "../api/auth/signup";

export default function Signup() {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({ email: "", name: "", password: "", phoneNumber: "" });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          try {
               const response = await signup(formData.name, formData.email, formData.password, formData.phoneNumber);
               console.log("he", response);
               if (response.status == 201) {
                    alert(response.data.message);
                    navigate("/login");
               } else if (response.data.statusCode == 400) {
                    alert(response.data.message);
               } else if (response.data.statusCode == 409) {
                    alert(response.data.message);
               }
          } catch (error) {
               console.error("회원가입 실패:", error.response.data.message);
               alert(error.response.data.message);
          }
     };

     return (
          <Page>
               <Title>회원가입</Title>
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
                         type="text"
                         name="name"
                         placeholder="이름"
                         value={formData.name}
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
                    <Input
                         type="tel"
                         name="phoneNumber"
                         placeholder="연락처"
                         value={formData.phoneNumber}
                         onChange={handleChange}
                         required
                    />
                    <Button type="submit">가입하기</Button>
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
