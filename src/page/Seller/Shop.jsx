import { useState, useEffect } from "react";
import styled from "styled-components";
import { createShop } from "../../api/shops/createShop";
import { getMyShopList } from "../../api/shops/getMyShopList";

export default function Shop() {
     const [shops, setShops] = useState([]);
     const [newShopInfo, setNewShopInfo] = useState({ name: "", description: "" });

     useEffect(() => {
          const fetchData = async () => {
               const res = await getMyShopList();
               setShops(res);
          };
          fetchData();
     }, []);

     const handleChange = (e) => {
          const { name, value } = e.target;
          setNewShopInfo((prev) => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async () => {
          if (!newShopInfo.name || !newShopInfo.description) {
               alert("상점 이름과 설명을 모두 입력해주세요.");
               return;
          }
          const res = await createShop(newShopInfo.name, newShopInfo.description);
          if (res.statusCode === 201) {
               const newShop = { ...newShopInfo };
               setShops((prevShops) => [...prevShops, newShop]);
               setNewShopInfo({ name: "", description: "" });
          }
          alert(res.message);
     };

     return (
          <Page>
               <Title>내 상점 목록</Title>
               <ShopList>
                    {shops.map((shop) => (
                         <ShopItem key={shop.id}>
                              <ShopName>{shop.name}</ShopName>
                              <ShopDescription>{shop.description}</ShopDescription>
                         </ShopItem>
                    ))}
               </ShopList>

               <Title>새 상점 추가</Title>
               <Form>
                    <div>
                         <Label>상점 이름</Label>
                         <Input type="text" name="name" value={newShopInfo.name} onChange={handleChange} />
                    </div>
                    <div>
                         <Label>상점 설명</Label>
                         <Textarea
                              name="description"
                              value={newShopInfo.description}
                              onChange={handleChange}
                         ></Textarea>
                    </div>
                    <Button onClick={handleSubmit}>추가하기</Button>
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

const ShopList = styled.div`
     margin-bottom: 3rem;
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;

const ShopItem = styled.div`
     padding: 1rem;
     border: 1px solid #eee;
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ShopName = styled.h3`
     margin: 0 0 0.5rem 0;
`;

const ShopDescription = styled.p`
     margin: 0;
     color: #555;
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
