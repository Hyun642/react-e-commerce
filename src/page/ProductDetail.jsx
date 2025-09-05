import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const mockProduct = {
     id: 1,
     name: "멋진 상품 1",
     price: 10000,
     description: "이 상품은 정말 멋져요. 설명이 들어가는 부분입니다. 품질이 우수하고 디자인이 세련되었습니다.",
     imageUrl: "https://via.placeholder.com/400x400",
     options: [
          { id: 1, name: "사이즈", values: ["S", "M", "L"] },
          { id: 2, name: "색상", values: ["Black", "White", "Blue"] },
     ],
};
const mockReviews = [
     { id: 1, user: "김리뷰", content: "아주 좋아요!", rating: 5 },
     { id: 2, user: "박리뷰", content: "괜찮네요. 배송도 빠릅니다.", rating: 4 },
];

export default function ProductDetail() {
     const { productId } = useParams();
     const navigate = useNavigate();
     const [product, setProduct] = useState(null);
     const [reviews, setReviews] = useState([]);
     const [reviewContent, setReviewContent] = useState("");

     useEffect(() => {
          setProduct(mockProduct);
          setReviews(mockReviews);
     }, [productId]);

     const handleAddToCart = () => alert("장바구니에 추가되었습니다. (구현되지 않음)");
     const handleReviewSubmit = (e) => {
          e.preventDefault();
          alert("리뷰가 등록되었습니다. (구현되지 않음)");
          setReviews([...reviews, { id: Date.now(), user: "나", content: reviewContent, rating: 5 }]);
          setReviewContent("");
     };

     if (!product) return <div>상품 정보를 불러오는 중...</div>;

     return (
          <Container>
               <BackButton onClick={() => navigate(-1)}> &larr; 뒤로가기</BackButton>
               <Main>
                    <div>
                         <Image src={product.imageUrl} alt={product.name} />
                    </div>
                    <Info>
                         <h2>{product.name}</h2>
                         <Price>{product.price.toLocaleString()}원</Price>
                         <p>{product.description}</p>
                         {product.options.map((opt) => (
                              <div key={opt.id}>
                                   <label>{opt.name}: </label>
                                   <Select>
                                        {opt.values.map((val) => (
                                             <option key={val} value={val}>
                                                  {val}
                                             </option>
                                        ))}
                                   </Select>
                              </div>
                         ))}
                         <Button onClick={handleAddToCart}>장바구니에 담기</Button>
                    </Info>
               </Main>
               <Hr />
               <ReviewsSection>
                    <h3>상품 리뷰</h3>
                    {reviews.map((review) => (
                         <Review key={review.id}>
                              <strong>{review.user}</strong> (평점: {review.rating})<p>{review.content}</p>
                         </Review>
                    ))}
                    <ReviewForm onSubmit={handleReviewSubmit}>
                         <h4>리뷰 작성하기</h4>
                         <Textarea
                              value={reviewContent}
                              onChange={(e) => setReviewContent(e.target.value)}
                              placeholder="리뷰를 작성해주세요."
                              required
                         ></Textarea>
                         <Button type="submit">리뷰 등록</Button>
                    </ReviewForm>
               </ReviewsSection>
          </Container>
     );
}
const Container = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 1000px;
     margin: 0 auto;
`;
const BackButton = styled.div`
     margin-bottom: 2rem;
     cursor: pointer;
`;
const Main = styled.div`
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 3rem;
     @media (max-width: 768px) {
          grid-template-columns: 1fr;
     }
`;
const Image = styled.img`
     width: 100%;
     border-radius: 8px;
`;
const Info = styled.div`
     display: flex;
     flex-direction: column;
     gap: 1rem;
`;
const Price = styled.p`
     font-size: 1.5rem;
     font-weight: bold;
`;
const Select = styled.select`
     padding: 0.5rem;
     border-radius: 4px;
`;
const Button = styled.button`
     padding: 0.75rem;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #333;
     color: white;
     font-size: 1rem;
`;
const Hr = styled.hr`
     margin: 3rem 0;
     border: none;
     border-top: 1px solid #eee;
`;
const ReviewsSection = styled.div``;
const Review = styled.div`
     border-bottom: 1px solid #eee;
     padding: 1rem 0;
`;
const ReviewForm = styled.form`
     display: flex;
     flex-direction: column;
     gap: 1rem;
     margin-top: 2rem;
`;
const Textarea = styled.textarea`
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     min-height: 80px;
`;
