import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { NotFound } from "components/Common";
import LoginPage from "features/auth/pages/LoginPage";
import SignUpPage from "features/auth/pages/SignUpPage";
import UserPage from "features/auth/pages/UserPage";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
