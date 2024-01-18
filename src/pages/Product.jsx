import { styled } from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cart.js";
import { mobile, tablet } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  ${mobile({flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  ${mobile({height: "100vw"})}
`;
const Image = styled.img`
  height: 80vh;
  width: fit-content;
  ${mobile({  width: "100vw", objectFit: "cover"})}

`;
const InfoContainer = styled.div`
  flex: 1;
  ${mobile({padding: "10px 15px"})}
  ${tablet({flexDirection: "column", gap: "40px"})}
`;
const Title = styled.h1`
  margin: 20px 0;
`;
const Description = styled.p`
  font-size: 17px;
  margin: 20px 0;
`;
const Price = styled.p`
  font-size: 40px;
  margin: 20px 0;
  ${mobile({fontSize: "1.8rem"})}

`;

const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  ${mobile({flexDirection: "column", gap : "5px"})}
`;
const Filter = styled.div`
  display: flex;
  margin-right: 10px;
  gap: 5px;
  align-items: center;
`;
const FilterText = styled.p`
  font-size: 17px;
`;
const FilterColor = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  &:hover {
    box-shadow: 1px 1px 3px 0;
  }
`;
const FilterSelect = styled.select`
  padding: 10px;
  border: none;
  font-size: 17px;
  cursor: pointer;
`;
const FilterOption = styled.option``;
// More Info
const MoreInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 40px;
`;
const AddButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Count = styled.p`
  font-size: 17px;
  border: 0.5px solid black;
  border-radius: 5px;
  padding: 5px 10px;
`;
const AddtoCartButton = styled.button`
  background-color: transparent;
  border: 0.5 solid black;
  padding: 8px;
  cursor: pointer;
`;
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
      }
    };
    getProduct();
  }, [id]);
  
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    //update cart
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image} alt="product-image" />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.desc}</Description>
          <Price>Rs. {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterText>Color :</FilterText>
              {product.color?.map((col) => (
                <FilterColor
                  color={col}
                  key={col}
                  onClick={() => setColor(col)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterText>Size :</FilterText>
              <FilterSelect onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterOption key={s}>{s}</FilterOption>
                ))}
              </FilterSelect>
            </Filter>
          </FilterContainer>
          <MoreInfoContainer>
            <AddButton>
              <RemoveIcon
                sx={{ fontSize: "17px", cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              />
              <Count>{quantity}</Count>
              <AddIcon
                sx={{ fontSize: "17px", cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              />
            </AddButton>
            <AddtoCartButton onClick={handleClick}>Add to Cart</AddtoCartButton>
          </MoreInfoContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
