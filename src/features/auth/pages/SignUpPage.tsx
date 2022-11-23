import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { authActions } from "../authSlice";
import { FormInput } from "components/Common";

interface SignUpPageProps {}

interface InputProps {
  name: string;
  email: string;
  password: string;
}

const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    helperText:
      "Username should be 3-16 characters and shouldn't include any special character.",
    pattern: "^[A-Za-z0-9]{3,16}$",
    placeholder: "Username",
  },
  {
    id: 2,
    name: "email",
    type: "email",
    helperText: "It should be a valid email address.",
    pattern: `[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$`,
    placeholder: "Email address",
  },
  {
    id: 3,
    name: "password",
    type: "password",
    helperText:
      "This field must be at least 7 characters, cannot contain white spaces",
    pattern: "^[A-Za-z0-9]{7,}$",
    placeholder: "Password",
  },
];

const SignUpPage = (props: SignUpPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector;
  let isValid = true;
  const nameRegex = /^[A-Za-z0-9]{3,16}$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^[A-Za-z0-9]{7,}$/;
  const status = selector((state) => state.auth.status);
  const [inputsForm, setInputs] = useState<InputProps>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUpClick = async () => {
    if (
      !nameRegex.test(inputsForm.name) ||
      !emailRegex.test(inputsForm.email) ||
      !passwordRegex.test(inputsForm.password)
    ) {
      isValid = false;
    }
    if (isValid) {
      dispatch(authActions.signUp(inputsForm));
    }
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
      dispatch(authActions.updateSatus(""));
    }
  }, [navigate, status, dispatch]);

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
            "& a": {
              textDecoration: "none",
              color: "blue",
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
            size="small"
            loading={status === "loading" ? true : false}
            variant="contained"
            onClick={handleSignUpClick}
          >
            Sign Up
          </LoadingButton>
          <Divider />

          <Box>
            Have an account already? <Link to="/login">Log in</Link>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default SignUpPage;
