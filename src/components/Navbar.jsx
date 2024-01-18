import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/user";
import MenuIcon from "@mui/icons-material/Menu";
import { disableCart } from "../redux/cart";
import { mobile, tablet, middle } from "../responsive";

const Container = styled.div`
  width: 100%;
  ${mobile({
    display: "flex",
  })}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  ${mobile({
    position: "relative",
    flex: 2,
    flexDirection: "column",
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  margin-left: 20px;
  align-items: center;
  ${tablet({
    marginLeft: "0px",
    // display: "none",
  })}
  ${mobile({
    display: "none",
  })}
  ${tablet({
    display: "none",
  })}
`;
const Language = styled.span`
  margin: 0 10px;
`;
const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 20px;
  height: 2rem;
`;
const InputSearch = styled.input`
  border: none;
  flex: 1;
  height: 1.8rem;
`;
const Center = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  ${tablet({
    fontSize: "1.8rem",
    textAlign: "center"
  })}
  ${mobile({
    fontSize: "1.5rem",
    textAlign: "left"
  })}
`;
const Logo = styled.h1`
  text-decoration: none;
  ${mobile({
  })}
`;
const Right = styled.ul`
  margin-right: 50px;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${tablet({
  })}
  ${(props) =>
    mobile({
      display: props.menuopen === "open" ? "flex" : "none",
      flexDirection: "column",
      justifyContent: "center",
      marginRight: "0",
      alignItems: "center",
    })}
`;

const LiElement = styled.li`
  list-style-type: none;
  font-size: 20px;
  margin-left: 20px;
  cursor: pointer;
  ${mobile({
    margin: "1rem 0",
  })}
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const MenuButton = styled.button`
  width: 3rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
  ${mobile({
    display: "block",
    marginRight: "1rem",
    position: "absolute",
    right: "0.2rem",
    top: "3rem",
  })}
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const { currentUser } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logOut());
    dispatch(disableCart());
  };
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <InputSearch />
            <SavedSearchIcon
              sx={{ color: "gray", fontSize: 20, paddingLeft: "20px" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>Verve.</Logo>
          </StyledLink>
        </Center>
        <Right menuopen={isMenuOpen ? "open" : undefined}>
          {currentUser ? (
            <LiElement>
              <StyledLink to="/" onClick={handleLogout}>
                Logout
              </StyledLink>
            </LiElement>
          ) : (
            <>
              <LiElement>
                <StyledLink to="/register">Register</StyledLink>
              </LiElement>
              <LiElement>
                <StyledLink to="/login">Login</StyledLink>
              </LiElement>
            </>
          )}
          <LiElement>
            <StyledLink to="/cart">
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </StyledLink>
          </LiElement>
        </Right>
      </Wrapper>
      <MenuButton onClick={handleClick}>
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </MenuButton>
    </Container>
  );
};

export default Navbar;
