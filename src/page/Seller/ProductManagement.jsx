import { useState, useEffect } from "react";
import styled from "styled-components";

const mockProducts = [
     { id: 1, name: "판매 상품 1", price: 15000, stock: 100 },
     { id: 2, name: "판매 상품 2", price: 30000, stock: 50 },
];

export default function ProductManagement() {
     const [products, setProducts] = useState([]);

     useEffect(() => {
          setProducts(mockProducts);
     }, []);

     const handleAddProduct = () => alert("상품 등록 페이지로 이동합니다. (구현되지 않음)");
     const handleEditProduct = (id) => alert(`상품 ID ${id} 수정 페이지로 이동합니다. (구현되지 않음)`);
     const handleDeleteProduct = (id) => {
          setProducts(products.filter((p) => p.id !== id));
          alert(`상품 ID ${id}이(가) 삭제되었습니다.`);
     };

     return (
          <Page>
               <Header>
                    <Title>상품 관리</Title>
                    <Button onClick={handleAddProduct}>새 상품 등록</Button>
               </Header>
               <Table>
                    <thead>
                         <tr>
                              <Th>상품명</Th>
                              <Th>가격</Th>
                              <Th>재고</Th>
                              <Th>관리</Th>
                         </tr>
                    </thead>
                    <tbody>
                         {products.map((product) => (
                              <tr key={product.id}>
                                   <Td>{product.name}</Td>
                                   <Td>{product.price.toLocaleString()}원</Td>
                                   <Td>{product.stock}</Td>
                                   <Td>
                                        <ActionButton onClick={() => handleEditProduct(product.id)}>수정</ActionButton>
                                        <ActionButton onClick={() => handleDeleteProduct(product.id)}>
                                             삭제
                                        </ActionButton>
                                   </Td>
                              </tr>
                         ))}
                    </tbody>
               </Table>
          </Page>
     );
}

const Page = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 800px;
     margin: 0 auto;
`;
const Header = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 2rem;
`;
const Title = styled.h2`
     margin-bottom: 1rem;
`;
const Button = styled.button`
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
`;
const Table = styled.table`
     width: 100%;
     border-collapse: collapse;
`;
const Th = styled.th`
     border-bottom: 2px solid #eee;
     padding: 0.75rem;
     text-align: left;
`;
const Td = styled.td`
     border-bottom: 1px solid #eee;
     padding: 0.75rem;
     text-align: left;
     vertical-align: middle;
`;
const ActionButton = styled.button`
     margin-right: 0.5rem;
     padding: 0.25rem 0.5rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
`;
