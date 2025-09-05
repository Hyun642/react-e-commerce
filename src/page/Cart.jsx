import { useState, useEffect } from "react";
import styled from "styled-components";

const mockCartItems = [
     { id: 1, name: "멋진 상품 1", price: 10000, quantity: 1, imageUrl: "https://via.placeholder.com/100" },
     { id: 2, name: "멋진 상품 2", price: 25000, quantity: 2, imageUrl: "https://via.placeholder.com/100" },
];

export default function Cart() {
     const [cartItems, setCartItems] = useState([]);

     useEffect(() => {
          setCartItems(mockCartItems);
     }, []);

     const handleQuantityChange = (id, quantity) => {
          const newQuantity = Math.max(1, quantity);
          setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
     };

     const handleRemoveItem = (id) => {
          setCartItems(cartItems.filter((item) => item.id !== id));
     };

     const handleOrder = () => alert("주문 페이지로 이동합니다. (구현되지 않음)");

     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

     return (
          <Page>
               <Title>장바구니</Title>
               <div>
                    {cartItems.length > 0 ? (
                         cartItems.map((item) => (
                              <CartItem key={item.id}>
                                   <ItemInfo>
                                        <ItemImage src={item.imageUrl} alt={item.name} />
                                        <div>
                                             <div>{item.name}</div>
                                             <div>{item.price.toLocaleString()}원</div>
                                        </div>
                                   </ItemInfo>
                                   <div>
                                        <QuantityInput
                                             type="number"
                                             value={item.quantity}
                                             onChange={(e) =>
                                                  handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                             }
                                        />
                                        <RemoveButton onClick={() => handleRemoveItem(item.id)}>삭제</RemoveButton>
                                   </div>
                              </CartItem>
                         ))
                    ) : (
                         <p>장바구니가 비어있습니다.</p>
                    )}
               </div>
               {cartItems.length > 0 && (
                    <Summary>
                         <Total>총 주문 금액: {totalPrice.toLocaleString()}원</Total>
                         <OrderButton onClick={handleOrder}>주문하기</OrderButton>
                    </Summary>
               )}
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
const CartItem = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 1rem 0;
     border-bottom: 1px solid #eee;
`;
const ItemInfo = styled.div`
     display: flex;
     align-items: center;
     gap: 1rem;
`;
const ItemImage = styled.img`
     width: 100px;
     height: 100px;
     object-fit: cover;
     border-radius: 4px;
`;
const QuantityInput = styled.input`
     width: 50px;
     text-align: center;
     padding: 0.25rem;
`;
const RemoveButton = styled.button`
     color: red;
     cursor: pointer;
     border: none;
     background-color: transparent;
`;
const Summary = styled.div`
     margin-top: 2rem;
     text-align: right;
`;
const Total = styled.p`
     font-size: 1.2rem;
     font-weight: bold;
`;
const OrderButton = styled.button`
     padding: 0.75rem 1.5rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
     font-size: 1rem;
     margin-top: 1rem;
`;
