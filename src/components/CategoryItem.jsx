import { styled } from "styled-components";
import { middle, mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  margin: 5px;
  flex: 1;
  position: relative;
  ${tablet({
    height: "100vh",
  })}
  ${mobile({
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  object-fit: cover;
  ${tablet({ width: "80%", margin: "0 auto", display: "block"})}
  ${mobile({width: "100%", margin: "0", display: "block", })}
`;
const InfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  margin-bottom: 25px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
  ${middle({
    fontSize: "2.3rem",
  })}
  ${tablet({
    fontSize: "2.3rem",
  })}
  ${mobile` 
    font-size: 2.3em;
  `}
`;
const Button = styled.button`
  font-size: 20px;
  background-color: white;
  padding: 15px;
  border: none;
  cursor: pointer;
`;
const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} alt="category image" />
      <InfoContainer>
        <Title>{item.title}</Title>
        <Link to={`/productList/${item.categories}`}>
          <Button>Shop Now</Button>
        </Link>
      </InfoContainer>
    </Container>
  );
};

export default CategoryItem;
