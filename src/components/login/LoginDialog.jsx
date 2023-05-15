import React, { useState, useContext } from "react";
import {authenticateSignup, authenticateLogin} from "../../services/api";
import { LoginContext } from "../../contexts/LoginProvider";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  styled,
} from "@mui/material";

const Component = styled(Box)`
  display: flex;
  height: 74vh;
  width: 90vh;
`;
const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  width: 33%;
  height: 100%;
  color: #fff;
  padding: 0 30px 0 35px;
`;

const Wrapper = styled(Box)`
  display  flex;
  flex-direction : column;
  padding : 30px 35px;
  flex : 1;
`;
const Span = styled(Typography)`
  color: blue;
  font-size: inherit;
  display: inline;
  cursor: pointer;
`;
const OtpButton = styled(Button)`
  border-radius: 2px;
  width: 100%;
  color: #2874f0;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  height: 2.6rem;
`;
const LoginButton = styled(Button)`
  border-radius: 2px;
  width: 100%;
  background: #fb641b;
  color: #fff;
  height: 2.6rem;
  &:hover {
    background: #fb641b;
    color: #fff;
    opacity: 0.95;
  }
`;

const LoginDialog = ({ loginOpen, setLoginOpen }) => {
  const { setAccount } = useContext(LoginContext);
  const signUpInitialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
  };
  const loginInitialValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState(false);
  const [loginUserData, setLoginUserData ] = useState(loginInitialValues);
  const [newUserData, setNewUserData] = useState(signUpInitialValues);
  const user = {
    new: {
      name: "new",
      heading: "Looks like you're new here!",
      subheading: "Sign up with your mobile number to get started",
    },
    existing: {
      name: "existing",
      heading: "Login",
      subheading: "Get access to your Orders, Wishlist and Recommendations",
    },
  };
  const [isNewUser, setIsNewUser] = useState(user.existing);

  const onChangeUserData = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    console.log(newUserData);
  };
  const handleDialogOnClose = () => {
    setLoginOpen(false);
    setIsNewUser(user.existing);
    setError(false);
  };
  const onSignup = async () => {
    let response = await authenticateSignup(newUserData);
    if (!response) {
      console.log("null response login dialog ");
      return;
    }
    console.log("got response in login dialog");
    handleDialogOnClose();
    setAccount(newUserData.name);
  };
  const onValueChange = (e)=>{
    setLoginUserData({...loginUserData, [e.target.name] : e.target.value})
  }
  const loginUser = async ()=>{
    let response = await authenticateLogin(newUserData);
    if (response.status === 200) {
      handleDialogOnClose();
      setAccount(response.data.data.name);
    }
    else{
      setError(true);
      console.log("no user");
    }
    
  }
  const Error = styled(Typography)`
  color : red;
  font-size : 11px;
  font-weight : 500;
  line-height : 0;
  margin : 11px 0 18px 0;
  `;
  return (
    <Dialog
      open={loginOpen}
      onClose={() => handleDialogOnClose()}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      {/* ------------------------------------------------------------------- */}
      {isNewUser.name === "new" ? (
        // ====================NEW USER=================================
        <Component>
          <Image>
            <Typography variant="h5" style={{ marginTop: "45px" }}>
              {isNewUser.heading}
            </Typography>
            <Typography style={{ marginTop: 20, color: "#dbdbdb" }}>
              {isNewUser.subheading}
            </Typography>
          </Image>
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Name"
              style={{ width: "100%", marginBottom: "12px" }}
              name="name"
              onChange={(e) => onChangeUserData(e)}
            ></TextField>
            <TextField
              style={{ width: "100%", marginBottom: "12px" }}
              variant="standard"
              label="Enter Email"
              name="email"
              onChange={(e) => onChangeUserData(e)}
            ></TextField>
            <TextField
              style={{ width: "100%", marginBottom: "12px" }}
              variant="standard"
              label="Enter Mobile number"
              name="mobile"
              onChange={(e) => onChangeUserData(e)}
            ></TextField>
            <TextField
              style={{ width: "100%", marginBottom: "12px" }}
              variant="standard"
              label="Enter password"
              name="password"
              onChange={(e) => onChangeUserData(e)}
            ></TextField>

            <LoginButton
              style={{ margin: "20px 0" }}
              onClick={() => onSignup()}
            >
              SignUp
            </LoginButton>

            <OtpButton
              name="existing login page btn"
              onClick={() => setIsNewUser(user.existing)}
              style={{ textTransform: "none" }}
            >
              Existing User? Log in
            </OtpButton>
          </Wrapper>
        </Component>
      ) : (
        // ====================EXISTING USER=================================
        <Component>
          <Image>
            <Typography variant="h5" style={{ marginTop: "45px" }}>
              {isNewUser.heading}
            </Typography>
            <Typography style={{ marginTop: 20, color: "#dbdbdb" }}>
              {isNewUser.subheading}
            </Typography>
          </Image>
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Email"
              style={{ width: "100%", marginBottom: "12px" }}
              name="email"
              onChange={(e) => onValueChange(e)}
            ></TextField>
            {error && <Error >* Please enter valid email or password</Error>}
            <TextField
              style={{ width: "100%", marginBottom: "12px" }}
              variant="standard"
              label="Enter password"
              name="password"
              onChange={(e) => onValueChange(e)}
            ></TextField>
            <Typography
              style={{ fontSize: 12, color: "grey", margin: "20px 0" }}
            >
              By continuing, you agree to Flipkart's <Span>Terms of Use</Span>{" "}
              and <Span>Privacy Policy.</Span>
            </Typography>
            <LoginButton onClick={loginUser}>Login</LoginButton>
            <Typography
              style={{ textAlign: "center", padding: "8px 0", color: "grey" }}
            >
              or
            </Typography>
            <OtpButton style={{ textTransform: "none" }}>Request OTP</OtpButton>
            <Typography
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#2874f0",
                cursor: "pointer",
                marginTop: "30px",
                textAlign: "center",
              }}
              onClick={() => setIsNewUser(user.new)}
            >
              New to Flipkart? Create an account
            </Typography>
          </Wrapper>{" "}
        </Component>
      )}
    </Dialog>
  );
};

export default LoginDialog;
