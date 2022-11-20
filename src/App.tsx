import { useAppSelector } from "app/hooks";
import { NotFound } from "components/Common";
import LoginPage from "features/auth/pages/LoginPage";
import SignUpPage from "features/auth/pages/SignUpPage";
import UserPage from "features/auth/pages/UserPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";

function App() {
  const selector = useAppSelector;
  const { isLoggedIn } = selector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {!isLoggedIn ? (
          <Route path="/login" element={<LoginPage />} />
        ) : (
          <Route path="/user" element={<UserPage />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
