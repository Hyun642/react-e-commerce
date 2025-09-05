import { useState, useEffect } from "react";
import styled from "styled-components";

const mockBusinessInfo = [{ id: 1, businessId: "123-45-67890", createdAt: "2024-01-01" }];

export default function BusinessInfo() {
     const [licenses, setLicenses] = useState([]);
     const [newBusinessId, setNewBusinessId] = useState("");

     useEffect(() => {
          setLicenses(mockBusinessInfo);
     }, []);

     const handleAddLicense = () => {
          if (!newBusinessId) {
               alert("사업자 등록번호를 입력해주세요.");
               return;
          }
          setLicenses([
               ...licenses,
               { id: Date.now(), businessId: newBusinessId, createdAt: new Date().toISOString().split("T")[0] },
          ]);
          setNewBusinessId("");
          alert("사업자 정보가 등록되었습니다.");
     };

     const handleDeleteLicense = (id) => {
          setLicenses(licenses.filter((license) => license.id !== id));
          alert("사업자 정보가 삭제되었습니다.");
     };

     return (
          <Page>
               <Title>사업자 정보 관리</Title>
               <AddSection>
                    <Input
                         type="text"
                         value={newBusinessId}
                         onChange={(e) => setNewBusinessId(e.target.value)}
                         placeholder="사업자 등록번호"
                    />
                    <Button onClick={handleAddLicense}>등록</Button>
               </AddSection>
               <Hr />
               <h3>등록된 사업자 정보</h3>
               <List>
                    {licenses.map((license) => (
                         <Card key={license.id}>
                              <div>
                                   <p>
                                        <strong>사업자번호:</strong> {license.businessId}
                                   </p>
                                   <p>
                                        <strong>등록일:</strong> {license.createdAt}
                                   </p>
                              </div>
                              <DeleteButton onClick={() => handleDeleteLicense(license.id)}>삭제</DeleteButton>
                         </Card>
                    ))}
               </List>
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
const AddSection = styled.div`
     display: flex;
     gap: 0.5rem;
     margin-bottom: 2rem;
`;
const Input = styled.input`
     flex-grow: 1;
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
`;
const List = styled.div`
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const Card = styled.div`
     border: 1px solid #eee;
     padding: 1rem;
     border-radius: 8px;
     display: flex;
     justify-content: space-between;
     align-items: center;
`;
const DeleteButton = styled.button`
     color: red;
     cursor: pointer;
     border: none;
     background-color: transparent;
`;
const Hr = styled.hr`
     border: none;
     border-top: 1px solid #eee;
     margin: 2rem 0;
`;
