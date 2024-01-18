import { styled } from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteProduct } from "../redux/cart";
import { addProduct } from "../redux/cart";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";

const stripeKey = import.meta.env.VITE_STRIPE_KEY;
const Container = styled.div``;
const Wrapper = styled.div``;
const Title = styled.h1`
  text-align: center;
  background-color: #f6f4eb;
  padding: 30px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
  ${mobile({ display: "none" })}
`;
const InfoWrapper = styled.div`
  display: flex;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  background-color: ${(props) =>
    props.bg == "filled" ? "black" : "transparent"};
  color: ${(props) => (props.bg == "filled" ? "white" : "black")};
  width: ${(props) => props.type == "summary" && "100%"};
  &:hover {
    background-color: ${(props) =>
      props.bg == "filled" ? "transparent" : "black"};
    color: ${(props) => (props.bg == "filled" ? "black" : "white")};
  }
`;
const InfoDetails = styled.p`
  font-size: 20px;
  margin: 0 20px;
`;
// Bottom
const Bottom = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column", gap: "40px" })}
  ${tablet({ flexDirection: "column", gap: "40px" })}
`;
const BottomContent = styled.div`
  height: 25vh;
  display: flex;
  ${mobile({ width: "100vw" })}
`;
const Info = styled.div`
  flex: 2;
`;
const Image = styled.img`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100%;
  object-fit: contain;
`;
const ProductDetails = styled.div`
  flex: 1;
  padding: 15px;
  font-size: 18px;
  ${mobile({ fontSize: "15px" })}
`;
const ProductName = styled.p`
  margin: 10px;
`;
const ProductId = styled.p`
  margin: 10px;
`;
const ProductColor = styled.p`
  margin: 10px;
`;
const ProductSize = styled.p`
  margin: 10px;
`;
const BoldSpan = styled.span`
  font-weight: bold;
`;
const ProductPriceInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  ${mobile({ fontSize: "15px" })}
`;
const ProductCounter = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;
const ProductCount = styled.div`
  font-size: 30px;
  margin: 0 10px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  ${mobile({ fontSize: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  padding: 30px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  margin: 20px;
  max-height: 50vh;
`;
const SummaryTitle = styled.h1``;
const SummaryDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 18px;
  font-weight: ${(props) => props.type == "total" && "bold"};
`;
const SummaryItem = styled.p``;
const SummaryPrice = styled.p``;

const SyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    color: black;
  }
`;
// React ------

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(cart);

  // stripe
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        history.push("/success", { stripeData: response.data, products: cart });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleRemove = ({ product, index }) => {
    dispatch(deleteProduct({ index, product }));
  };
  const handleAdd = (product) => {
    dispatch(addProduct(product));
  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Button bg="filled">
            <SyledLink to="/">Continue Shopping</SyledLink>
          </Button>
          <InfoWrapper>
            <InfoDetails>Shopping Bag ({cart.quantity})</InfoDetails>
            <InfoDetails>Your Wishlist (0)</InfoDetails>
          </InfoWrapper>
          <StripeCheckout
            stripeKey={stripeKey}
            token={onToken}
            name="Gucci"
            image="https://static.vecteezy.com/system/resources/previews/006/627/375/original/floral-heraldic-luxury-circle-logo-template-in-for-restaurant-royalty-boutique-cafe-hotel-jewelry-fashion-and-other-illustration-free-vector.jpg"
            billingAddress
            shippingAddress
            description={`Your total is RS.${cart.total}`}
            amount={cart.total * 100}
          >
            <Button type="summary">Checkout Now</Button>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <BottomContent>
                {console.log(index)}
                <Image src={product.image} />
                <ProductDetails>
                  <ProductName>
                    <BoldSpan>Product :</BoldSpan>
                    {product.title}
                  </ProductName>
                  <ProductColor>{product.color}</ProductColor>
                  <ProductSize>
                    <BoldSpan>Size :</BoldSpan> {product.size}
                  </ProductSize>
                </ProductDetails>
                <ProductPriceInfo>
                  <ProductCounter>
                    <RemoveIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRemove({ product, index })}
                    />
                    <ProductCount>{product.quantity}</ProductCount>
                    <AddIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAdd(product)}
                    />
                  </ProductCounter>
                  <ProductPrice>
                    {product.price * product.quantity}
                  </ProductPrice>
                </ProductPriceInfo>
              </BottomContent>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryDetails>
              <SummaryItem>Subtotal</SummaryItem>
              <SummaryPrice>{cart.total}</SummaryPrice>
            </SummaryDetails>
            <SummaryDetails>
              <SummaryItem>Estimated Shipping</SummaryItem>
              <SummaryPrice>{cart.total ? "Rs 150" : "0"}</SummaryPrice>
            </SummaryDetails>
            <SummaryDetails>
              <SummaryItem>Shipping Discount</SummaryItem>
              <SummaryPrice>{cart.total ? "- Rs 150" : "0"}</SummaryPrice>
            </SummaryDetails>
            <SummaryDetails type="total">
              <SummaryItem>Total</SummaryItem>
              <SummaryPrice>Rs {cart.total}</SummaryPrice>
            </SummaryDetails>
            <StripeCheckout
              stripeKey={stripeKey}
              token={onToken}
              name="Gucci"
              image="https://static.vecteezy.com/system/resources/previews/006/627/375/original/floral-heraldic-luxury-circle-logo-template-in-for-restaurant-royalty-boutique-cafe-hotel-jewelry-fashion-and-other-illustration-free-vector.jpg"
              billingAddress
              shippingAddress
              description={`Your total is RS.${cart.total}`}
              amount={cart.total * 100}
            >
              <Button type="summary">Checkout Now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
