import { useState, useEffect } from "react";
import styled from "styled-components";
import { createShop } from "../../api/shops/createShop";
import { getMyShopList } from "../../api/shops/getMyShopList";
import { updateShop } from "../../api/shops/updateShop";
import { deleteShop } from "../../api/shops/deleteShop";

export default function Shop() {
     const [shops, setShops] = useState([]);
     const [newShopInfo, setNewShopInfo] = useState({ name: "", description: "" });
     const [editingShop, setEditingShop] = useState(null);

     const fetchShops = async () => {
          try {
               const res = await getMyShopList();
               setShops(res);
          } catch (error) {
               console.error("Failed to fetch shops:", error);
               alert("상점 목록을 불러오는 데 실패했습니다.");
          }
     };

     useEffect(() => {
          fetchShops();
     }, []);

     const handleNewShopChange = (e) => {
          const { name, value } = e.target;
          setNewShopInfo((prev) => ({ ...prev, [name]: value }));
     };

     const handleCreateSubmit = async () => {
          if (!newShopInfo.name || !newShopInfo.description) {
               alert("상점 이름과 설명을 모두 입력해주세요.");
               return;
          }
          try {
               const res = await createShop(newShopInfo.name, newShopInfo.description);
               alert(res.message);
               if (res.statusCode === 201) {
                    fetchShops();
                    setNewShopInfo({ name: "", description: "" });
               }
          } catch (error) {
               console.error("Failed to create shop:", error);
               alert("상점 생성에 실패했습니다.");
          }
     };

     const handleDelete = async (shopId) => {
          if (window.confirm("정말로 이 상점을 삭제하시겠습니까?")) {
               try {
                    await deleteShop(shopId);
                    alert("상점이 삭제되었습니다.");
                    fetchShops();
               } catch (error) {
                    console.error("Failed to delete shop:", error);
                    alert("상점 삭제에 실패했습니다.");
               }
          }
     };

     const handleEditClick = (shop) => {
          setEditingShop({ ...shop });
     };

     const handleEditFormChange = (e) => {
          const { name, value } = e.target;
          setEditingShop((prev) => ({ ...prev, [name]: value }));
     };

     const handleUpdateSubmit = async () => {
          if (!editingShop || !editingShop.name || !editingShop.description) {
               alert("상점 이름과 설명을 모두 입력해주세요.");
               return;
          }
          const res = await updateShop(editingShop.id, editingShop.name, editingShop.description);
          alert(res.message);
          if (res.statusCode === 200) {
               setEditingShop(null);
               fetchShops();
          }
     };

     return (
          <Page>
               {editingShop && (
                    <Modal>
                         <ModalContent>
                              <Title>상점 정보 수정</Title>
                              <Form>
                                   <div>
                                        <Label>상점 이름</Label>
                                        <Input
                                             type="text"
                                             name="name"
                                             value={editingShop.name}
                                             onChange={handleEditFormChange}
                                        />
                                   </div>
                                   <div>
                                        <Label>상점 설명</Label>
                                        <Textarea
                                             name="description"
                                             value={editingShop.description}
                                             onChange={handleEditFormChange}
                                        ></Textarea>
                                   </div>
                                   <ButtonContainer>
                                        <ModalButton onClick={handleUpdateSubmit}>저장하기</ModalButton>
                                        <ModalButton onClick={() => setEditingShop(null)} variant="secondary">
                                             취소
                                        </ModalButton>
                                   </ButtonContainer>
                              </Form>
                         </ModalContent>
                    </Modal>
               )}

               <Title>내 상점 목록</Title>
               <ShopList>
                    {shops.map((shop) => (
                         <ShopItem key={shop.id}>
                              <div>
                                   <ShopName>{shop.name}</ShopName>
                                   <ShopDescription>{shop.description}</ShopDescription>
                              </div>
                              <ButtonContainer>
                                   <ActionButton onClick={() => handleEditClick(shop)}>수정</ActionButton>
                                   <ActionButton onClick={() => handleDelete(shop.id)} variant="danger">
                                        삭제
                                   </ActionButton>
                              </ButtonContainer>
                         </ShopItem>
                    ))}
               </ShopList>

               <Title>새 상점 추가</Title>
               <Form>
                    <div>
                         <Label>상점 이름</Label>
                         <Input type="text" name="name" value={newShopInfo.name} onChange={handleNewShopChange} />
                    </div>
                    <div>
                         <Label>상점 설명</Label>
                         <Textarea
                              name="description"
                              value={newShopInfo.description}
                              onChange={handleNewShopChange}
                         ></Textarea>
                    </div>
                    <Button onClick={handleCreateSubmit}>추가하기</Button>
               </Form>
          </Page>
     );
}

const Page = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 800px;
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
     padding: 1.5rem;
     border: 1px solid #eee;
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
     display: flex;
     justify-content: space-between;
     align-items: center;
     gap: 1rem;
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
     width: 100%;
`;

const Textarea = styled.textarea`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     min-height: 100px;
     width: 100%;
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
     width: 100%;
`;

const ButtonContainer = styled.div`
     display: flex;
     gap: 0.5rem;
     align-items: center;
     flex-shrink: 0;
`;

const ActionButton = styled.button`
     padding: 0.4rem 0.8rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: ${(props) => (props.variant === "danger" ? "#e74c3c" : "#3498db")};
     color: white;
     font-size: 0.9rem;
     &:hover {
          opacity: 0.9;
     }
`;

const Modal = styled.div`
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.6);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 1000;
`;

const ModalContent = styled.div`
     background: white;
     padding: 2rem;
     border-radius: 8px;
     width: 90%;
     max-width: 500px;
`;

const ModalButton = styled(ActionButton)`
     padding: 0.75rem 1.25rem;
     font-size: 1rem;
     background-color: ${(props) => (props.variant === "secondary" ? "#7f8c8d" : "#3498db")};
`;
