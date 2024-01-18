import { styled } from "styled-components";
import { mobile, tablet, middle } from "../responsive";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 70vh;
  background-color: #f5f5f5;
  text-align: center;
  ${tablet({
    fontSize: "45px",
  })}
  ${mobile({
    width: "100%",
  })}
`;
const Title = styled.h1`
  font-size: 70px;
  margin: 10px;
  ${tablet({
    fontSize: "3.5rem",
  })}
  ${mobile({
    fontSize: "3rem",
  })}
`;
const Description = styled.p`
  margin: 10px;
  font-size: 30px;
  ${tablet({
    fontSize: "25px",
  })}
  ${mobile({
    fontSize: "20px",
    textAlign: "center",
  })}
`;
const InputContainer = styled.form`
  display: flex;
  width: 55%;
  margin-top: 20px;
  ${middle({
    width: "80%",
    fontSize: "25px",
  })};
  ${tablet({
    width: "80%",
    fontSize: "25px",
  })};
  ${mobile({
    width: "80%",
    flexDirection: "column",
    gap: "10px",
  })}
`;
const Input = styled.input`
  font-size: 20px;
  padding: 15px 20px;
  flex: 9;
  border: 0.5 solid lightgray;
  ${mobile({
    fontSize: "17px",
  })}
`;
const Button = styled.button`
  flex: 1;
  background-color: teal;
  color: white;
  padding: 0 45px;
  border: none;
  cursor: pointer;
  ${mobile({
    padding: "5px 45px",
  })}
`;
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };
  return (
    <Container>
      {subscribed ? (
        <>
          <Title>Thank you for subscribing.</Title>
          <Description>
            Get weekly coupons, product updates and much more!!
          </Description>
        </>
      ) : (
        <>
          <Title>Newsletter</Title>
          <Description>Sign up to get updates of our new products</Description>
        </>
      )}
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
