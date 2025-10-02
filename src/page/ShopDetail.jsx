import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

// In a real app, you would fetch this data from an API based on the shopId
const mockShopData = {
     "b7ebfe3a-6e5b-4b42-962d-840737378ee5": {
          name: "aaa",
          description: "aaa",
          products: [
               { id: 1, name: "프리미엄 티셔츠", price: 35000, imageUrl: "https://via.placeholder.com/250" },
               { id: 2, name: "슬림핏 청바지", price: 78000, imageUrl: "https://via.placeholder.com/250" },
          ],
     },
     "ad1e7b2d-9136-4d50-85b0-9e6ce612ef7e": {
          name: "123",
          description: "1",
          products: [
               { id: 3, name: "클래식 스니커즈", price: 120000, imageUrl: "https://via.placeholder.com/250" },
               { id: 4, name: "가죽 백팩", price: 150000, imageUrl: "https://via.placeholder.com/250" },
          ],
     },
     "a8094c9c-d904-45e4-8246-8e5bdf66a50f": {
          name: "나의 멋진 상점213123",
          description: "세상에서 가장 멋진 상품들을 판매합니다.",
          products: [
               { id: 5, name: "선글라스", price: 65000, imageUrl: "https://via.placeholder.com/250" },
               { id: 6, name: "손목 시계", price: 250000, imageUrl: "https://via.placeholder.com/250" },
               { id: 7, name: "멋진 상품 1", price: 10000, imageUrl: "https://via.placeholder.com/250" },
               { id: 8, name: "멋진 상품 2", price: 25000, imageUrl: "https://via.placeholder.com/250" },
          ],
     },
};

export default function ShopDetail() {
     const { shopId } = useParams();
     const navigate = useNavigate();
     const shop = mockShopData[shopId] || { name: "상점을 찾을 수 없습니다.", description: "", products: [] };

     return (
          <Container>
               <Header>
                    <Logo onClick={() => navigate("/")}>SimpleShop</Logo>
                    <Button onClick={() => navigate(-1)}>뒤로가기</Button>
               </Header>
               <ShopHeader>
                    <h1>{shop.name}</h1>
                    <p>{shop.description}</p>
               </ShopHeader>

               <ProductSection>
                    <h2>상품 목록</h2>
                    <ProductGrid>
                         {shop.products.map((product) => (
                              <ProductCard key={product.id}>
                                   <ProductImage src={product.imageUrl} alt={product.name} />
                                   <h3>{product.name}</h3>
                                   <p>{product.price.toLocaleString()}원</p>
                              </ProductCard>
                         ))}
                    </ProductGrid>
               </ProductSection>
          </Container>
     );
}

const Container = styled.div`
     padding: 2rem;
     font-family: sans-serif;
`;

const Header = styled.header`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-bottom: 1rem;
     border-bottom: 1px solid #eee;
     margin-bottom: 2rem;
`;

const Logo = styled.h1`
     cursor: pointer;
     font-size: 1.5rem;
     font-weight: bold;
`;

const Button = styled.button`
     padding: 0.5rem 1rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
`;

const ShopHeader = styled.header`
     text-align: center;
     margin-bottom: 3rem;
     padding-bottom: 2rem;
     border-bottom: 1px solid #eee;

     h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
     }

     p {
          font-size: 1.2rem;
          color: #666;
     }
`;

const ProductSection = styled.section`
     h2 {
          font-size: 1.8rem;
          margin-bottom: 2rem;
          padding-left: 1rem;
     }
`;

const ProductGrid = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
     gap: 2rem;
`;

const ProductCard = styled.div`
     border: 1px solid #eee;
     border-radius: 8px;
     overflow: hidden;
     text-align: center;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
     transition: box-shadow 0.3s ease;
     cursor: pointer;

     &:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
     }

     h3 {
          font-size: 1.1rem;
          margin: 1rem 0 0.5rem;
     }

     p {
          color: #333;
          font-weight: bold;
          margin-bottom: 1rem;
     }
`;

const ProductImage = styled.img`
     max-width: 100%;
     height: auto;
`;
