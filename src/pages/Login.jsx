import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile, tablet, middle } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.istockphoto.com/id/1458215521/vector/line-icon-set-pattern-for-haute-couture-fashion.jpg?s=612x612&w=0&k=20&c=6WGriZvT6MeEZ0VW2-3ZPbeP0dai-u74v57bvYcCLaI=");
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  background-color: white;
  max-width: 30%;
  padding: 30px;
  ${middle({
    maxWidth: "50%",
  })}
  ${tablet({
    maxWidth: "60%",
  })}
  ${mobile({
    maxWidth: "100%",
    margin: "2rem 0"
  })}
`;
const Title = styled.h1`
  text-align: center;
`;
const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  margin: 10px 20px;
  flex: 1;
  padding: 10px 20px;
  font-size: 17px;
`;
const Agreement = styled.p`
  font-size: 17px;
  margin: 20px;
`;
const Button = styled.button`
  background-color: black;
  color: white;
  margin: 0 20px;
  padding: 10px 20px;
  width: 40%;
  font-size: 17px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
  &:disabled {
    background-color: grey;
    color: white;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 10px 20px;
  width: 100%;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
    color: red;
  }
`;
const Error = styled.span`
  color: red;
  margin: 20px;
`
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector(state=>state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Content>
        <Title>Login</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Agreement>
            By signing in, I consent to process my personal data.
          </Agreement>
          <Button onClick={handleClick} >Login</Button>
          {error && <Error>Invalid Username Or Password!!!</Error>}
          <Link>Forgot Password? Click here</Link>
          <Link>Do not have an account. Sign Up here.</Link>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
