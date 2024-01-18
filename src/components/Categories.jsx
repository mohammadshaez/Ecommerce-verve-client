import { styled } from "styled-components";
import { categories } from "../pages/data";
import CategoryItem from "./CategoryItem";
import { mobile, tablet } from "../responsive";

const Container = styled.div``;

const SaleContainer = styled.div`
  height: 100px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${mobile({
    fontSize: "10px",
  })}
  ${tablet({
    fontSize: "15px",
  })}
`;
const SaleTitle = styled.h1`
  color: white;
  ${mobile({
    textAlign: "center",
  })}
  ${tablet({
    textAlign: "center",
    fontSize: "20px",
  })}
`;
const Button = styled.button`
  background-color: white;
  padding: 10px;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  cursor: pointer;
  ${mobile({
    display: "none",
  })}
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({
    display: "block",
  })}
  ${tablet({
    display: "block",
  })}
`;
const Categories = () => {
  return (
    <Container>
      <SaleContainer>
        <SaleTitle>Get Upto 50% Off On The Most Hearted Brands</SaleTitle>
        <Button>Explore</Button>
      </SaleContainer>
      <CategoryContainer>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </CategoryContainer>
    </Container>
  );
};

export default Categories;
