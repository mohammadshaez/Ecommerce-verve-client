import { styled } from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cart";
import { useState } from "react";
import { mobile, tablet, middle } from "../responsive";

const InfoContainer = styled.div`
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  height: auto;
  width: 22%;
  margin: 10px 0;
  position: relative;
  &:hover ${InfoContainer} {
    opacity: 1;
  }
  ${middle({
    width: "30%",
  })}
  ${tablet({
    width: "48%",
  })}
  ${mobile({
    width: "100%",
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  ${mobile({
    objectFit: "contain",
  })}
  ${tablet({
    fontSize: "15px",
  })}
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin: 8px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ProductItem = ({ item, showCartAlert }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const handleOnClick = () => {
    showCartAlert();
    dispatch(
      addProduct({
        ...item,
        quantity,
        size: item.size[0],
        color: item.color[0],
      })
    );
  };
  return (
    <Container>
      <Image src={item.image} />
      <InfoContainer>
        <Icon>
          <AddShoppingCartIcon onClick={handleOnClick} />
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
        <StyledLink to={`/product/${item._id}`}>
          <Icon>
            <ZoomInIcon />
          </Icon>
        </StyledLink>
      </InfoContainer>
      
    </Container>
  );
};

export default ProductItem;
