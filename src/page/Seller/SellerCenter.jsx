import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SellerCenter() {
     const navigate = useNavigate();

     return (
          <Page>
               <Title>판매자 센터</Title>
               <MenuGrid>
                    <MenuCard onClick={() => navigate("/seller-center/business")}>
                         <h3>사업자 정보 관리</h3>
                         <p>사업자 정보를 등록하고 관리합니다.</p>
                    </MenuCard>
                    <MenuCard onClick={() => navigate("/seller-center/shop")}>
                         <h3>상점 관리</h3>
                         <p>상점 이름과 설명을 수정합니다.</p>
                    </MenuCard>
                    <MenuCard onClick={() => navigate("/seller-center/products")}>
                         <h3>상품 관리</h3>
                         <p>판매할 상품을 등록하고 관리합니다.</p>
                    </MenuCard>
               </MenuGrid>
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

const MenuGrid = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
     gap: 1.5rem;
`;

const MenuCard = styled.div`
     border: 1px solid #eee;
     border-radius: 8px;
     padding: 2rem;
     text-align: center;
     cursor: pointer;
     transition: box-shadow 0.2s ease-in-out;

     &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
     }

     h3 {
          margin-bottom: 0.5rem;
     }

     p {
          color: #666;
          font-size: 0.9rem;
     }
`;
