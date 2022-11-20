import React, { useEffect, useState } from "react";
import { Box, TextField, Divider, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authActions } from "../authSlice";
import { useNavigate } from "react-router-dom";

interface SignUpPageProps {}

interface InputProps {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = (props: SignUpPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  const signUpSuccess = selector((state) => state.auth.signUp.signUpSuccess);
  const loading = selector((state) => state.auth.loading);
  const [inputs, setInputs] = useState<InputProps>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(inputs);
  };

  const handleChange = (e: any) => {
    console.log(e.target.name);

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUpClick = async () => {
    dispatch(authActions.signUp(inputs));
    console.log(signUpSuccess);
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/login");
    }
  }, [navigate, signUpSuccess]);

  return (
    <div
      style={{
        left: "0",
        minHeight: "100%",
        position: "absolute",
        right: "0",
        top: "0",
        zIndex: 10,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          display="flex"
          flexDirection={"column"}
          boxSizing="border-box"
          maxWidth="396px"
          paddingBottom="24px"
          paddingTop="10px"
          paddingLeft="16px"
          paddingRight="16px"
          alignItems="center"
          justifyContent="center"
          margin="30vh auto"
          borderRadius="8px"
          boxShadow="0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)"
          sx={{
            position: "relative",
            "& .MuiTextField-root": { m: 1 },
            "& .MuiTypography-root": {
              alignSelf: "flex-start",
            },
            "& .MuiButton-root": {
              m: 1,
              textTransform: "capitalize",
              minWidth: "194px",
              backgroundColor: "#00a400",
              fontSize: "18px",
              fontWeight: "bold",
            },
            backgroundColor: "#fff",
            "& hr": {
              m: 1,
            },
          }}
        >
          <Typography
            sx={{
              color: "#1c1e21",
              fontSize: "32px",
              lineHeight: "38px",
              marginBottom: "0",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Typography>
          <Typography
            sx={{
              color: "#606770",
              fontSize: "15px",
              lineHeight: "24px",
            }}
          >
            It's quick and easy.
          </Typography>
          <Divider style={{ width: "100%" }}></Divider>
          <TextField
            fullWidth
            required
            variant="outlined"
            size="medium"
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            size="medium"
            type="email"
            name="email"
            placeholder="Email address"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            required
            variant="outlined"
            type="password"
            size="medium"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            onClick={handleSignUpClick}
          >
            Sign Up
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
};

export default SignUpPage;
