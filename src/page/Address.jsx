import { useState, useEffect } from "react";
import styled from "styled-components";
import { createUserAddress } from "../api/user/createUserAddress";

const mockAddresses = [
     { id: 1, name: "집", address: "서울시 강남구 테헤란로 123" },
     { id: 2, name: "회사", address: "서울시 서초구 강남대로 456" },
];

export default function Address() {
     const [addresses, setAddresses] = useState([]);
     const [isAdding, setIsAdding] = useState(false);
     const [newAddress, setNewAddress] = useState({ name: "", address: "" });

     useEffect(() => {
          setAddresses(mockAddresses);
     }, []);

     const handleAdd = async () => {
          if (!newAddress.name || !newAddress.address) {
               alert("모든 필드를 입력해주세요.");
               return;
          }
          setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
          setNewAddress({ name: "", address: "" });
          setIsAdding(false);
          const res = await createUserAddress(newAddress.name, newAddress.address);
          if (res.statusCode === 201) alert(res.message);
          else {
               alert(res.message);
          }
     };

     const handleDelete = (id) => {
          setAddresses(addresses.filter((addr) => addr.id !== id));
     };

     return (
          <Page>
               <Title>주소록 관리</Title>
               <Button onClick={() => setIsAdding(!isAdding)}>{isAdding ? "취소" : "새 배송지 추가"}</Button>
               {isAdding && (
                    <AddForm>
                         <Input
                              type="text"
                              placeholder="배송지 이름 (예: 집)"
                              value={newAddress.name}
                              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                         />
                         <Input
                              type="text"
                              placeholder="상세 주소"
                              value={newAddress.address}
                              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                         />
                         <ActionButton onClick={handleAdd}>추가하기</ActionButton>
                    </AddForm>
               )}
               <AddressList>
                    {addresses.map((addr) => (
                         <AddressCard key={addr.id}>
                              <div>
                                   <strong>{addr.name}</strong>
                                   <p style={{ margin: "0.5rem 0 0 0" }}>{addr.address}</p>
                              </div>
                              <div>
                                   <Button onClick={() => alert("수정 기능은 구현되지 않았습니다.")}>수정</Button>
                                   <DeleteButton onClick={() => handleDelete(addr.id)}>삭제</DeleteButton>
                              </div>
                         </AddressCard>
                    ))}
               </AddressList>
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
const Button = styled.button`
     padding: 0.5rem 1rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
`;
const AddForm = styled.div`
     border: 1px solid #eee;
     padding: 1.5rem;
     border-radius: 8px;
     margin-top: 1rem;
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const Input = styled.input`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
`;
const ActionButton = styled.button`
     padding: 0.75rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
`;
const AddressList = styled.div`
     margin-top: 2rem;
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const AddressCard = styled.div`
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
     margin-left: 0.5rem;
`;
