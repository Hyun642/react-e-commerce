import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { searchShop } from "../api/shops/searchShop";

const mockProducts = [
     { id: 1, name: "멋진 상품 1", price: 10000, imageUrl: "https://via.placeholder.com/200" },
     { id: 2, name: "멋진 상품 2", price: 25000, imageUrl: "https://via.placeholder.com/200" },
     { id: 3, name: "멋진 상품 3", price: 15000, imageUrl: "https://via.placeholder.com/200" },
     { id: 4, name: "멋진 상품 4", price: 30000, imageUrl: "https://via.placeholder.com/200" },
     { id: 5, name: "멋진 상품 5", price: 50000, imageUrl: "https://via.placeholder.com/200" },
     { id: 6, name: "멋진 상품 6", price: 12000, imageUrl: "https://via.placeholder.com/200" },
];

export default function Main() {
     const navigate = useNavigate();
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [products, setProducts] = useState([]);
     const [searchTerm, setSearchTerm] = useState("");
     const [searchResults, setSearchResults] = useState([]);

     useEffect(() => {
          const token = localStorage.getItem("accessToken");
          setIsLoggedIn(!!token);
          setProducts(mockProducts);
     }, []);

     const handleLogout = () => {
          localStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          alert("로그아웃 되었습니다.");
     };

     const handleSearch = async () => {
          if (!searchTerm.trim()) {
               setSearchResults([]);
               return;
          }
          try {
               const response = await searchShop(searchTerm);
               setSearchResults(response.data || []);
               console.log("Search Response:", response);
          } catch (error) {
               console.error("Search failed:", error);
               setSearchResults([]);
          }
     };

     const handleResultClick = (shopId) => {
          navigate(`/shops/${shopId}`);
          setSearchTerm("");
          setSearchResults([]);
     };

     return (
          <Container>
               <Header>
                    <Logo onClick={() => navigate("/")}>SimpleShop</Logo>
                    <Nav>
                         {isLoggedIn ? (
                              <>
                                   <Button onClick={() => navigate("/my-page")}>마이페이지</Button>
                                   <Button onClick={() => navigate("/cart")}>장바구니</Button>
                                   <Button onClick={handleLogout}>로그아웃</Button>
                              </>
                         ) : (
                              <>
                                   <Button onClick={() => navigate("/login")}>로그인</Button>
                                   <Button onClick={() => navigate("/signup")}>회원가입</Button>
                              </>
                         )}
                    </Nav>
               </Header>

               <MainContent>
                    <SearchSection>
                         <h2>상점 혹은 상품을 찾아보세요</h2>
                         <SearchWrapper>
                              <SearchInput
                                   type="text"
                                   placeholder="상점 검색..."
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <Button onClick={handleSearch}>검색</Button>
                              {searchResults.length > 0 && (
                                   <SearchResultsList>
                                        {searchResults.map((shop) => (
                                             <SearchResultItem key={shop.id} onClick={() => handleResultClick(shop.id)}>
                                                  {shop.name}
                                             </SearchResultItem>
                                        ))}
                                   </SearchResultsList>
                              )}
                         </SearchWrapper>
                    </SearchSection>

                    <section>
                         <ProductGrid>
                              {products.map((product) => (
                                   <ProductCard key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                        <ProductImage src={product.imageUrl} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p>{product.price.toLocaleString()}원</p>
                                   </ProductCard>
                              ))}
                         </ProductGrid>
                    </section>
               </MainContent>
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
`;

const Logo = styled.h1`
     cursor: pointer;
     font-size: 1.5rem;
     font-weight: bold;
`;

const Nav = styled.nav`
     display: flex;
     gap: 1rem;
`;

const Button = styled.button`
     padding: 0.5rem 1rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
`;

const MainContent = styled.main`
     padding-top: 2rem;
`;

const SearchSection = styled.section`
     text-align: center;
     margin-bottom: 3rem;
`;

const SearchWrapper = styled.div`
     position: relative;
     display: inline-block;
`;

const SearchInput = styled.input`
     padding: 0.5rem;
     width: 300px;
     margin-right: 0.5rem;
     border-radius: 4px;
     border: 1px solid #ccc;
`;

const SearchResultsList = styled.ul`
     background: #fff;
     border: 1px solid #ccc;
     border-radius: 4px;
     list-style-type: none;
     margin-top: 5px;
     padding: 0;
     position: absolute;
     width: 100%;
     z-index: 1;
     text-align: left;
`;

const SearchResultItem = styled.li`
     padding: 10px;
     cursor: pointer;

     &:hover {
          background-color: #f0f0f0;
     }
`;

const ProductGrid = styled.div`
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
     gap: 2rem;
`;

const ProductCard = styled.div`
     border: 1px solid #eee;
     padding: 1rem;
     text-align: center;
     cursor: pointer;
     border-radius: 8px;
     &:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     }
`;

const ProductImage = styled.img`
     max-width: 100%;
     height: auto;
     margin-bottom: 1rem;
     border-radius: 4px;
`;
