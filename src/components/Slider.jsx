import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { sliderItems } from "../pages/data";
import { useEffect, useState } from "react";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  ${tablet({
  })}
`;
const Arrow = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftArrow = styled(Arrow)`
  left: 10px;
`
const RightArrow = styled(Arrow)`
  right: 10px;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.sliderindex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  ${tablet({
    maxWidth: "100%",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
  })}
  ${mobile({
    maxWidth: "100%",
    width: "100%",
    justifyContent: "center",
    height: "100vh",
    position: "relative",
  })}
`;
const Image = styled.img`
  height: 100%;
  ${mobile({
    width: "100%",
    height: "100%",
    objectFit: "cover",
  })}
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 50px;
  ${tablet({
      display: "none"
  })}
  ${mobile({
    position: "absolute",
    display: "block",
    bottom: 0,
    backgroundColor:
      "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "20px 0",
    width: "100vw",
    boxSizing: "border-box",
    textAlign: "center",
  })}
`;

const Title = styled.h1`
  font-size: 3rem;
  ${mobile({
    fontSize: "30px",
    margin: "20px 0"
  })}
`;
const Description = styled.p`
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin: 55px 0;
  ${mobile({
    fontSize: "20px",
    margin: 0,
  })}
`;
const Button = styled(Link)`
  padding: 15px;
  background-color: white;
  cursor: pointer;
  border: none;
  font-size: 15px;
  box-shadow: 3px 3px 2px 2px;
  text-decoration: none;
  color: black;
  &:hover {
    box-shadow: 3px 3px 4px 2px;
  }
  ${mobile({
    display: 'none',
  })}
`;

const Slider = () => {
  const [sliderindex, setsliderindex] = useState(0);
  const handleClick = () => {
    setsliderindex((prevIndex) => (prevIndex + 1) % sliderItems.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setsliderindex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [sliderItems.length]);
  return (
    <Container>
      <LeftArrow onClick={handleClick}>
        <ArrowBackIosIcon />
      </LeftArrow>
      <Wrapper sliderindex={sliderindex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button to={`/productList/${item.categories}?`}>Shop Now</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <RightArrow onClick={handleClick}>
        <ArrowForwardIosIcon />
      </RightArrow>
    </Container>
  );
};

export default Slider;
