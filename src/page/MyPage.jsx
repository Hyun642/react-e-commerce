import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const mockOrders = [
     { id: "order123", date: "2024-08-01", total: 35000, status: "배송 완료", items: "멋진 상품 1 외 1건" },
     { id: "order456", date: "2024-08-03", total: 50000, status: "배송 중", items: "멋진 상품 5" },
];

export default function MyPage() {
     const navigate = useNavigate();
     const [orders, setOrders] = useState([]);

     useEffect(() => {
          setOrders(mockOrders);
     }, []);

     return (
          <Page>
               <Title>마이페이지</Title>
               <Menu>
                    <Button onClick={() => navigate("/my-page/address")}>주소록 관리</Button>
                    <Button onClick={() => navigate("/seller-center")}>판매자 센터</Button>
               </Menu>
               <Hr />
               <h3>나의 주문 내역</h3>
               <OrderList>
                    {orders.map((order) => (
                         <OrderCard key={order.id}>
                              <OrderHeader>
                                   <div>
                                        <strong>주문일자:</strong> {order.date}
                                   </div>
                                   <OrderStatus>{order.status}</OrderStatus>
                              </OrderHeader>
                              <div>
                                   <strong>주문번호:</strong> {order.id}
                              </div>
                              <div>
                                   <strong>주문상품:</strong> {order.items}
                              </div>
                              <div>
                                   <strong>결제금액:</strong> {order.total.toLocaleString()}원
                              </div>
                         </OrderCard>
                    ))}
               </OrderList>
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
const Menu = styled.div`
     display: flex;
     gap: 1rem;
     margin-bottom: 2rem;
     justify-content: center;
`;
const Button = styled.button`
     padding: 0.75rem 1.5rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
`;
const OrderList = styled.div`
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const OrderCard = styled.div`
     border: 1px solid #eee;
     padding: 1.5rem;
     border-radius: 8px;
`;
const OrderHeader = styled.div`
     display: flex;
     justify-content: space-between;
     margin-bottom: 1rem;
`;
const OrderStatus = styled.div`
     font-weight: bold;
`;
const Hr = styled.hr`
     border: none;
     border-top: 1px solid #eee;
     margin: 2rem 0;
`;
