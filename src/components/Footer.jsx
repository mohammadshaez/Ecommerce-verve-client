import { styled } from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { mobile, tablet, middle } from "../responsive";

const Container = styled.div`
  height: 40vh;
  display: flex;
  padding-left: 35px;
  margin: 20px 0;
  ${middle({ flexDirection: "column", gap: "40px" })}
  ${tablet({ flexDirection: "column", gap: "40px" })}
  ${mobile({ flexDirection: "column", gap: "40px" })}
`;
// Info
const InfoContainer = styled.div`
  height: 100%;
  flex: 1;
  ${mobile({ gap: "10px", marginBottom: "10px" })}
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;
const Description = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  word-spacing: .3rem;
  text-align: justify;
  ${middle({ margin: "0 20px 20px 0px" })}
  ${tablet({ margin: "0 20px 20px 0px" })}
  ${mobile({ margin: "0 20px 20px 0px" })}
`;
const IconContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const IconCircle = styled.a`
  border-radius: 50%;
  background-color: ${(props) =>
    props.logo == "fb"
      ? "#1877F2"
      : props.logo == "insta"
      ? "#E4405F"
      : props.logo == "pin"
      ? "#E60023"
      : props.logo == "twiiter"
      ? "#1DA1F2"
      : props.logo == "yt"
      ? "#FF0000"
      : "blue"};
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
// Useful Links
const LinksContainer = styled.div`
  flex: 1;
  padding-left: 35px;
  height: 100%;
  ${mobile({
    paddingLeft: 0,
  })}
`;
const LinksTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 35px;
`;
const LinksInfoContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const LinksInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 18px;
  color: black;
`;
// Contact Us
const ContactContainer = styled.div`
  padding-left: 40px;
  flex: 1;
  ${mobile({
    paddingLeft: 0,
  })}
`;

const ContactTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 30px;
`;
const ContactInfoContainer = styled.div``;
const ContactInfo = styled.h3`
  display: flex;
  margin-bottom: 20px;
`;
const ContactInfoImage = styled.img`
  width: 300px;
`;
const Footer = () => {
  return (
    <Container>
      <InfoContainer>
        <Title>Verve.</Title>
        <Description>
        We take pride in being more than just an online store – we're a community that embraces diversity and inclusivity. Our commitment to offering a wide range of sizes, styles, and designs ensures that everyone can find something that resonates with them. 
        </Description>
        <IconContainer>
          <IconCircle href="https://facebook.com" logo={"fb"}>
            <FacebookIcon sx={{ color: "white" }} />
          </IconCircle>
          <IconCircle href="https://instagram.com" logo={"insta"}>
            <InstagramIcon sx={{ color: "white" }} />
          </IconCircle>
          <IconCircle href="https://pinterest.com" logo={"pin"}>
            <PinterestIcon sx={{ color: "white" }} />
          </IconCircle>
          <IconCircle href="https://twitter.com" logo={"twiiter"}>
            <TwitterIcon sx={{ color: "white" }} />
          </IconCircle>
          <IconCircle href="https://youtube.com" logo={"yt"}>
            <YouTubeIcon sx={{ color: "white" }} />
          </IconCircle>
        </IconContainer>
      </InfoContainer>
      <LinksContainer>
        <LinksTitle>Useful Links</LinksTitle>
        <LinksInfoContainer>
          <LinksInfo>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/cart">Cart</StyledLink>
            <StyledLink to="/maintenance">Men Fashion</StyledLink>
            <StyledLink to="/maintenance">Women Fashion</StyledLink>
            <StyledLink to="/maintenance">Accessories</StyledLink>
          </LinksInfo>
          <LinksInfo>
            <StyledLink to="/maintenance">My Account</StyledLink>
            <StyledLink to="/maintenance">Order Tracking</StyledLink>
            <StyledLink to="/maintenance">Wishlist</StyledLink>
            <StyledLink to="/maintenance">Terms & Conditions</StyledLink>
            <StyledLink to="/maintenance">Privacy Policy</StyledLink>
          </LinksInfo>
        </LinksInfoContainer>
      </LinksContainer>
      <ContactContainer>
        <ContactTitle>Contact Us</ContactTitle>
        <ContactInfoContainer>
          <ContactInfo>
            <LocationOnIcon sx={{ marginRight: "10px" }} />
            123, Grand Avenue, Delhi
          </ContactInfo>
          <ContactInfo>
            <LocalPhoneIcon sx={{ marginRight: "10px" }} />
            +91 987 654 3210
          </ContactInfo>
          <ContactInfo>
            <EmailIcon sx={{ marginRight: "10px" }} />
            <a
              href="mailto:mohamadshaez@gmail.com"
              style={{ textDecoration: "none", color: "black" }}
            >
              support@verve.com
            </a>
          </ContactInfo>
          <ContactInfoImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgxHqrD_nGVqvt7S41xxc-00Hq1NyCx2OtIA&usqp=CAU"
            alt="card-image"
          />
        </ContactInfoContainer>
      </ContactContainer>
    </Container>
  );
};

export default Footer;
