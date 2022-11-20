import React, { useState, useEffect } from "react";
import { Box, TextField, Divider, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authActions } from "../authSlice";

interface InputProps {
  email: string;
  password: string;
}

interface LoginPageProps {}

const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selector = useAppSelector;
  const isLoggedIn = selector((state) => state.auth.isLoggedIn);
  const loading = selector((state) => state.auth.loading);
  const [inputs, setInputs] = useState<InputProps>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    console.log(e.target.name);

    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginClick = () => {
    dispatch(authActions.login(inputs));
  };

  const handleSignUpClick = () => {
    dispatch(authActions.createAccount());
    localStorage.removeItem("access_token");
    navigate("/signup");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
      // localStorage.removeItem("access_token");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div>
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
            "& .MuiTextField-root": { m: 1 },
            "& .MuiButton-root": { m: 1, textTransform: "capitalize" },
            backgroundColor: "#fff",
            "& hr": {
              height: "10px",
              width: "100%",
            },
          }}
        >
          <TextField
            fullWidth
            required
            name="email"
            defaultValue={inputs.email}
            variant="outlined"
            size="medium"
            type="email"
            placeholder="Email address"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            required
            name="password"
            defaultValue={inputs.password}
            inputProps={{
              minLength: "7",
            }}
            variant="outlined"
            type="password"
            size="medium"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <LoadingButton
            fullWidth
            size="large"
            loading={loading}
            variant="contained"
            type="submit"
            onClick={handleLoginClick}
          >
            Log in
          </LoadingButton>
          <Typography mt={2} mb={2}>
            Forgotten password?
          </Typography>
          <Divider style={{ width: "100%", margin: "16px 0" }} />
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              color="success"
              variant="contained"
              size="large"
              style={{ background: "#42b72a" }}
              onClick={handleSignUpClick}
            >
              Create New Account
            </Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;
