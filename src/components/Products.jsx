import { styled } from "styled-components";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { mobile, tablet } from "../responsive";
import { BASE_URL } from "../../requestMethods";

const Container = styled.div`
`;
const MainTitle = styled.h1`
  background-color: #f5f5f5;
  text-align: center;
  font-size: 45px;
  padding: 20px 0;
  `;
const ProductsContainer = styled.div`
position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  ${mobile({
    display: "block",
    width: "100%"
  })}
  ${tablet({
    diaplay: "flex",
    flexWrap: "wrap",
  })}
`;
const Alert = styled.p`
  position: fixed; 
  bottom: 20px;
  left: 50%; 
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  text-align :center ;
`;
const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAlert, setSShowAlert] = useState(false);

  const showCartAlert = () => {
    setSShowAlert(true);
    setTimeout(() => {
      setSShowAlert(false);
    }, 2000);
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `${BASE_URL}products/?categories=${category}`
            : `${BASE_URL}products`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filter]);

  useEffect(() => {
    if(sort === "relevance") {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => a.createdAt - b.createdAt) 
      )
    } else if(sort === "asc") {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => a.price - b.price)
      )
    } else {
      setFilteredProducts((prev) => 
        [...prev].sort((a,b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <Container>
      <MainTitle>Our Products</MainTitle>
      <ProductsContainer>
        {category ?  filteredProducts.map((item) => (
          <ProductItem item={item} key={item.id} showCartAlert={showCartAlert}/>
        )) : products.slice(0,8).map((item) => (
          <ProductItem item={item} key={item.id} showCartAlert={showCartAlert}/>
        ))}
      </ProductsContainer>
      {showAlert && (
        <>
          <Alert>Added To Cart Successfully!!!</Alert>
        </>
      )}
    </Container>
  );
};

export default Products;
