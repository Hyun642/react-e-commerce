import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMyShopList } from "../../api/shops/getMyShopList";
import { createProduct } from "../../api/products/createProduct";

const mockdata_initialProducts = [
     {
          id: 1,
          shopId: "shop1",
          shopName: "나의 멋진 상점",
          name: "사과",
          description: "맛있는 사과",
          price: 10000,
          thumbnailImageUrl: "https://via.placeholder.com/100",
          images: [{ url: "https://via.placeholder.com/400" }],
          options: [
               {
                    name: "색상",
                    isRequired: true,
                    units: [
                         { name: "빨강", stock: 100, additionalPrice: 0 },
                         { name: "초록", stock: 50, additionalPrice: 500 },
                    ],
               },
          ],
     },
];

const initialNewProductState = {
     shopId: "",
     name: "",
     description: "",
     price: "",
     thumbnailImageUrl: "",
     image: [], // Changed from images
     option: [], // Changed from options
};

export default function ProductManagement() {
     const [shops, setShops] = useState([""]);
     const [products, setProducts] = useState(mockdata_initialProducts);
     const [isFormVisible, setIsFormVisible] = useState(false);
     const [newProduct, setNewProduct] = useState(initialNewProductState);

     const fetchData = async () => {
          try {
               const shopList = await getMyShopList();
               setShops(shopList);
          } catch (error) {
               console.error("Failed to fetch shops:", error);
               alert("상점 목록을 불러오는 데 실패했습니다.");
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setNewProduct({ ...newProduct, [name]: value });
     };

     const addImage = () => setNewProduct({ ...newProduct, image: [...newProduct.image, { url: "" }] });
     const removeImage = (index) =>
          setNewProduct({ ...newProduct, image: newProduct.image.filter((_, i) => i !== index) });
     const handleImageChange = (e, index) => {
          const updated = [...newProduct.image];
          updated[index].url = e.target.value;
          setNewProduct({ ...newProduct, image: updated });
     };

     const addOption = () =>
          setNewProduct({
               ...newProduct,
               option: [...newProduct.option, { name: "", stock: "", isRequired: false, units: [] }],
          });
     const removeOption = (index) =>
          setNewProduct({ ...newProduct, option: newProduct.option.filter((_, i) => i !== index) });
     const handleOptionChange = (e, index) => {
          const { name, value, type, checked } = e.target;
          const updated = [...newProduct.option];
          updated[index][name] = type === "checkbox" ? checked : value;
          setNewProduct({ ...newProduct, option: updated });
     };

     const addUnit = (optionIndex) => {
          const updated = [...newProduct.option];
          updated[optionIndex].units.push({ name: "", stock: "", additionalPrice: "" });
          setNewProduct({ ...newProduct, option: updated });
     };
     const removeUnit = (optionIndex, unitIndex) => {
          const updated = [...newProduct.option];
          updated[optionIndex].units = updated[optionIndex].units.filter((_, i) => i !== unitIndex);
          setNewProduct({ ...newProduct, option: updated });
     };
     const handleUnitChange = (e, optionIndex, unitIndex) => {
          const { name, value } = e.target;
          const updated = [...newProduct.option];
          updated[optionIndex].units[unitIndex][name] = value;
          setNewProduct({ ...newProduct, option: updated });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          const apiPayload = {
               shopId: newProduct.shopId,
               name: newProduct.name,
               description: newProduct.description,
               price: parseInt(newProduct.price, 10),
               thumbnailImageUrl: newProduct.thumbnailImageUrl,
               image: newProduct.image || [],
               option: (newProduct.option || []).map((opt) => ({
                    ...opt,
                    stock: parseInt(opt.stock, 10),
                    units: (opt.units || []).map((unit) => ({
                         ...unit,
                         stock: parseInt(unit.stock, 10),
                         additionalPrice: parseInt(unit.additionalPrice, 10),
                    })),
               })),
          };

          try {
               const res = await createProduct(apiPayload);
               const shopName = shops.find((s) => s.id === newProduct.shopId)?.name;
               const productToAdd = {
                    ...newProduct,
                    id: Date.now(),
                    shopName,
                    price: apiPayload.price,
                    image: apiPayload.image,
                    option: apiPayload.option,
               };
               if (res.statusCode === 201) {
                    setProducts([productToAdd, ...products]);
                    setNewProduct(initialNewProductState);
                    setIsFormVisible(false);
               }
               alert(res.message);
          } catch (err) {
               console.error("상품 등록 실패:", err);
               alert("상품 등록에 실패했습니다. API 에러를 확인하세요.");
          }
     };

     return (
          <Page>
               <Header>
                    <Title>상품 관리</Title>
                    <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                         {isFormVisible ? "등록 취소" : "새 상품 등록"}
                    </Button>
               </Header>

               {isFormVisible && (
                    <Form onSubmit={handleSubmit}>
                         <Section>
                              <SectionTitle>기본 정보 *</SectionTitle>
                              <Select name="shopId" value={newProduct.shopId} onChange={handleInputChange} required>
                                   <option value="">상점을 선택하세요</option>
                                   {shops.map((shop) => (
                                        <option key={shop.id} value={shop.id}>
                                             {shop.name}
                                        </option>
                                   ))}
                              </Select>
                              <Input
                                   name="name"
                                   value={newProduct.name}
                                   onChange={handleInputChange}
                                   placeholder="상품명"
                                   required
                              />
                              <Textarea
                                   name="description"
                                   value={newProduct.description}
                                   onChange={handleInputChange}
                                   placeholder="상품 설명"
                                   required
                              />
                              <Input
                                   name="price"
                                   type="number"
                                   value={newProduct.price}
                                   onChange={handleInputChange}
                                   placeholder="가격"
                                   required
                              />
                         </Section>

                         <Section>
                              <SectionTitle>이미지 *</SectionTitle>
                              <Input
                                   name="thumbnailImageUrl"
                                   value={newProduct.thumbnailImageUrl}
                                   onChange={handleInputChange}
                                   placeholder="썸네일 이미지 URL"
                                   required
                              />
                              {newProduct.image.map((img, i) => (
                                   <DynamicInputWrapper key={i}>
                                        <Input
                                             value={img.url}
                                             onChange={(e) => handleImageChange(e, i)}
                                             placeholder="상세 이미지 URL"
                                        />
                                        <RemoveButton type="button" onClick={() => removeImage(i)}>
                                             삭제
                                        </RemoveButton>
                                   </DynamicInputWrapper>
                              ))}
                              <AddButton type="button" onClick={addImage}>
                                   상세 이미지 추가
                              </AddButton>
                         </Section>

                         <Section>
                              <SectionTitle>옵션 *</SectionTitle>
                              {newProduct.option.map((opt, i) => (
                                   <OptionBlock key={i}>
                                        <DynamicInputWrapper>
                                             <Input
                                                  name="name"
                                                  value={opt.name}
                                                  onChange={(e) => handleOptionChange(e, i)}
                                                  placeholder="옵션명 (예: 색상)"
                                             />
                                             <Input
                                                  name="stock"
                                                  type="number"
                                                  value={opt.stock}
                                                  onChange={(e) => handleOptionChange(e, i)}
                                                  placeholder="옵션 재고"
                                             />
                                             <label>
                                                  <input
                                                       type="checkbox"
                                                       name="isRequired"
                                                       checked={opt.isRequired}
                                                       onChange={(e) => handleOptionChange(e, i)}
                                                  />{" "}
                                                  필수
                                             </label>
                                             <RemoveButton type="button" onClick={() => removeOption(i)}>
                                                  옵션 삭제
                                             </RemoveButton>
                                        </DynamicInputWrapper>
                                        {opt.units.map((unit, j) => (
                                             <UnitBlock key={j}>
                                                  <Input
                                                       name="name"
                                                       value={unit.name}
                                                       onChange={(e) => handleUnitChange(e, i, j)}
                                                       placeholder="단위명 (예: 빨강)"
                                                  />
                                                  <Input
                                                       name="stock"
                                                       type="number"
                                                       value={unit.stock}
                                                       onChange={(e) => handleUnitChange(e, i, j)}
                                                       placeholder="재고"
                                                  />
                                                  <Input
                                                       name="additionalPrice"
                                                       type="number"
                                                       value={unit.additionalPrice}
                                                       onChange={(e) => handleUnitChange(e, i, j)}
                                                       placeholder="추가 가격"
                                                  />
                                                  <RemoveButton type="button" onClick={() => removeUnit(i, j)}>
                                                       삭제
                                                  </RemoveButton>
                                             </UnitBlock>
                                        ))}
                                        <AddButton type="button" onClick={() => addUnit(i)}>
                                             단위 추가
                                        </AddButton>
                                   </OptionBlock>
                              ))}
                              <AddButton type="button" onClick={addOption}>
                                   옵션 추가
                              </AddButton>
                         </Section>

                         <SubmitButton type="submit">상품 등록 완료</SubmitButton>
                    </Form>
               )}

               <ProductTable products={products} />
          </Page>
     );
}

function ProductTable({ products }) {
     return (
          <Table>
               <thead>
                    <tr>
                         <Th>썸네일</Th>
                         <Th>상점명</Th>
                         <Th>상품명</Th>
                         <Th>가격</Th>
                         <Th>관리</Th>
                    </tr>
               </thead>
               <tbody>
                    {products.map((p) => (
                         <tr key={p.id}>
                              <Td>
                                   <Thumbnail src={p.thumbnailImageUrl} alt={p.name} />
                              </Td>
                              <Td>{p.shopName}</Td>
                              <Td>{p.name}</Td>
                              <Td>{p.price.toLocaleString()}원</Td>
                              <Td>
                                   <ActionButton>수정</ActionButton>
                                   <ActionButton>삭제</ActionButton>
                              </Td>
                         </tr>
                    ))}
               </tbody>
          </Table>
     );
}

const Page = styled.div`
     padding: 2rem;
     font-family: sans-serif;
     max-width: 1000px;
     margin: 0 auto;
`;

const Header = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 2rem;
`;

const Title = styled.h1`
     font-size: 2rem;
`;

const Button = styled.button`
     padding: 0.6rem 1.2rem;
     border: none;
     border-radius: 6px;
     cursor: pointer;
     background-color: #333;
     color: white;
     font-size: 1rem;
     transition: background-color 0.2s;
     &:hover {
          background-color: #555;
     }
`;

const AddButton = styled(Button)`
     background-color: #007bff;
     margin-top: 0.5rem;
     &:hover {
          background-color: #0056b3;
     }
`;

const RemoveButton = styled(Button)`
     background-color: #dc3545;
     padding: 0.3rem 0.6rem;
     font-size: 0.8rem;
     &:hover {
          background-color: #c82333;
     }
`;

const SubmitButton = styled(Button)`
     background-color: #28a745;
     width: 100%;
     padding: 1rem;
     font-size: 1.2rem;
     margin-top: 1rem;
     &:hover {
          background-color: #218838;
     }
`;

const Form = styled.form`
     background-color: #f9f9f9;
     padding: 2rem;
     border-radius: 8px;
     margin-bottom: 2rem;
     border: 1px solid #eee;
`;

const Section = styled.div`
     margin-bottom: 2rem;
     padding-bottom: 2rem;
     border-bottom: 1px solid #e0e0e0;
     &:last-of-type {
          border-bottom: none;
     }
`;

const SectionTitle = styled.h2`
     font-size: 1.5rem;
     margin-bottom: 1.5rem;
     color: #333;
`;

const Input = styled.input`
     width: 100%;
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     box-sizing: border-box;
     margin-bottom: 1rem;
`;

const Select = styled.select`
     width: 100%;
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     box-sizing: border-box;
     margin-bottom: 1rem;
     background-color: white;
`;

const Textarea = styled.textarea`
     width: 100%;
     padding: 0.75rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     box-sizing: border-box;
     margin-bottom: 1rem;
     min-height: 100px;
`;

const DynamicInputWrapper = styled.div`
     display: flex;
     align-items: center;
     gap: 1rem;
     margin-bottom: 1rem;
`;

const OptionBlock = styled.div`
     background-color: #fff;
     border: 1px solid #ddd;
     border-radius: 6px;
     padding: 1.5rem;
     margin-bottom: 1.5rem;
`;

const UnitBlock = styled.div`
     display: flex;
     gap: 0.5rem;
     align-items: center;
     background-color: #f0f0f0;
     padding: 1rem;
     border-radius: 4px;
     margin-top: 1rem;
`;

const Table = styled.table`
     width: 100%;
     border-collapse: collapse;
     margin-top: 2rem;
`;

const Th = styled.th`
     border-bottom: 2px solid #ddd;
     padding: 1rem;
     text-align: left;
     background-color: #f7f7f7;
`;

const Td = styled.td`
     border-bottom: 1px solid #eee;
     padding: 1rem;
     text-align: left;
     vertical-align: middle;
`;

const Thumbnail = styled.img`
     width: 80px;
     height: 80px;
     object-fit: cover;
     border-radius: 4px;
`;

const ActionButton = styled.button`
     margin-right: 0.5rem;
     padding: 0.3rem 0.7rem;
     border: 1px solid #ccc;
     border-radius: 4px;
     cursor: pointer;
     background-color: white;
     transition: background-color 0.2s;
     &:hover {
          background-color: #f0f0f0;
     }
`;
