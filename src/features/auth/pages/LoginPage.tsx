import React, { useState, useEffect } from "react";
import { Box, Divider, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { authActions } from "../authSlice";
import FormInput from "components/Common/FormInput";

interface InputProps {
  email: string;
  password: string;
}

interface LoginPageProps {}

const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    helperText: "It should be a valid email address.",
    pattern: `\[a\-z0\-9\._%\+\-\]\+@\[a\-z0\-9\.\-\]\+\\\.\[a\-z\]\{2,4\}\$`,
    placeholder: "Email address",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    helperText:
      "This field must be at least 7 characters, cannot contain white spaces",
    pattern: "^[A-Za-z0-9]{7,}$",
    placeholder: "Password",
  },
];

const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selector = useAppSelector;
  const isLoggedIn = selector((state) => state.auth.isLoggedIn);
  const loading = selector((state) => state.auth.loading);
  const [inputsForm, setInputsForm] = useState<InputProps>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setInputsForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginClick = () => {
    dispatch(authActions.login(inputsForm));
  };

  const handleSignUpClick = () => {
    dispatch(authActions.createAccount());
    localStorage.removeItem("access_token");
    navigate("/signup");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/user");
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
            "& .MuiTextField-root p": {
              display: "none",
              color: "red",
            },
            "& .MuiTextField-root:has(input:invalid[focused='true']) p, & .MuiTextField-root:has(input:invalid[focused='true']) fieldset":
              {
                display: "block",
                borderColor: "red",
              },
          }}
        >
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              helperText={input.helperText}
              name={input.name}
              type={input.type}
              pattern={input.pattern}
              placeholder={input.placeholder}
              onChange={handleChange}
            />
          ))}
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
