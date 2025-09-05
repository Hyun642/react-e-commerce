import { useState, useEffect } from "react";
import styled from "styled-components";

const mockShopInfo = {
     name: "나의 멋진 상점",
     description: "세상에서 가장 멋진 상품들을 판매합니다.",
};

export default function Shop() {
     const [shopInfo, setShopInfo] = useState({ name: "", description: "" });

     useEffect(() => {
          setShopInfo(mockShopInfo);
     }, []);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setShopInfo((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = () => {
          alert("상점 정보가 수정되었습니다.");
          console.log("Updated shop info:", shopInfo);
     };

     return (
          <Page>
               <Title>상점 관리</Title>
               <Form>
                    <div>
                         <Label>상점 이름</Label>
                         <Input type="text" name="name" value={shopInfo.name} onChange={handleChange} />
                    </div>
                    <div>
                         <Label>상점 설명</Label>
                         <Textarea name="description" value={shopInfo.description} onChange={handleChange}></Textarea>
                    </div>
                    <Button onClick={handleSubmit}>수정하기</Button>
               </Form>
          </Page>
     );
}
const Page = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 600px;
     margin: 0 auto;
`;
const Title = styled.h2`
     margin-bottom: 2rem;
     text-align: center;
`;
const Form = styled.div`
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const Label = styled.label`
     font-weight: bold;
     margin-bottom: 0.25rem;
`;
const Input = styled.input`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
`;
const Textarea = styled.textarea`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     min-height: 100px;
`;
const Button = styled.button`
     margin-top: 1rem;
     padding: 0.75rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
     font-size: 1rem;
`;
