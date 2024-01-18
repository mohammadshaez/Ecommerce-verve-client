import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { publicRequest } from "../../requestMethods";
import { mobile, tablet, middle } from "../responsive";
import { useHistory } from "react-router-dom";
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
  max-width: 50%;
  padding: 30px;
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
`;
const Error = styled.p`

`;

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  // console.log(userDetails)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.username ||
      !userDetails.email ||
      !userDetails.password ||
      !confirmPassword
    ) {
      setError("Please Fill All The Details!!!");
    } else if (userDetails.password !== confirmPassword) {
      setError("Password does not match!!!");
    } else {
      setError("");

      try {
        const response = await publicRequest.post(
          "/auth/register",
          userDetails
        );
        if (response.data.success) {
          history.push("/login");
        }
        console.log("Registration response:", response);
      } catch (error) {
        console.error("Registration error:", error.message);
        setError("Something went wrong", error.message);
      }
    }
  };
  return (
    <Container>
      <Content>
        <Title>Create A New Account</Title>
        <Form>
          <Input
            type="text"
            placeholder="First Name"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                firstName: e.target.value,
              }))
            }
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                lastName: e.target.value,
              }))
            }
            required
          />
          <Input
            type="text"
            placeholder="Username"
            value={userDetails.username}
            onChange={(e) =>
              setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                username: e.target.value,
              }))
            }
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                email: e.target.value,
              }))
            }
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails((prevUserDetails) => ({
                ...prevUserDetails,
                password: e.target.value,
              }))
            }
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Agreement>
            By creating an account, I consent to process my personal data.
          </Agreement>
          <Button onClick={handleSubmit}>Create</Button>
          <Error>{error}</Error>  
        </Form>
      </Content>
    </Container>
  );
};

export default Register;
