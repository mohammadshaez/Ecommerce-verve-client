import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { mobile, tablet, middle } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px 35px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 35px;
  ${mobile({
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "20px 5px",
    alignItems: "flex-start"
  })}
`;
const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterText = styled.h3`
  margin: 0 10px;
`;
const FilterSelect = styled.select`
  font-size: 15px;
  border: none;
  padding: 10px;
  cursor: pointer;
`;
const FilterOption = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("relevance");
  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter({
      ...filter,
      [event.target.name]: value,
    });
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter</FilterText>
          <FilterSelect name="color" onChange={handleFilter}>
            <FilterOption disabled>Color</FilterOption>
            <FilterOption>White</FilterOption>
            <FilterOption>Black</FilterOption>
            <FilterOption>Red</FilterOption>
            <FilterOption>Blue</FilterOption>
            <FilterOption>Green</FilterOption>
            <FilterOption>Purple</FilterOption>
          </FilterSelect>
          <FilterSelect name="size" onChange={handleFilter}>
            <FilterOption disabled>Size</FilterOption>
            <FilterOption>XS</FilterOption>
            <FilterOption>S</FilterOption>
            <FilterOption>M</FilterOption>
            <FilterOption>L</FilterOption>
            <FilterOption>XL</FilterOption>
          </FilterSelect>
        </Filter>
        <Filter>
          <FilterText>Sort</FilterText>
          <FilterSelect onChange={(e) => setSort(e.target.value)}>
            <FilterOption value="relevance">Relevence</FilterOption>
            <FilterOption value="popular">Popular</FilterOption>
            <FilterOption value="asc">Price - Low to High</FilterOption>
            <FilterOption value="desc">Price - High to Low</FilterOption>
          </FilterSelect>
        </Filter>
      </FilterContainer>
      <Products category={category} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
