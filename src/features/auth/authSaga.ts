import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { take, call, put, all, takeLeading } from "redux-saga/effects";

import { authActions, AuthState, LoginPayload } from "./authSlice";
import { createUserAPI, loginAPI, logOutAPI } from "../../api";

// Worker handle login
function* handleLogin(payload: LoginPayload) {
  try {
    const response: AxiosResponse<any, any> = yield call(loginAPI, payload);
    // set token to localStorage
    localStorage.setItem("access_token", response.data.token);

    yield put(authActions.loginSuccess(response.data));
    toast.success("Login success!");
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
    toast.error("Login failed! Check authentication credentials");
  }
}

// Worker handle logout
function* handleLogOut(payload: AuthState) {
  try {
    yield call(logOutAPI, payload.token, payload.user);

    // remove token to localStorage
    localStorage.removeItem("access_token");

    toast.success("Logout Success!");
  } catch (error) {
    toast.error(`${error}`);
  }
}

// saga watcher login/ logout
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      //Watch login action
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );

      yield call(handleLogin, action.payload);
      continue;
    }

    // watcher logout action
    const action: PayloadAction<AuthState> = yield take(
      authActions.logOut.type
    );
    yield call(handleLogOut, action.payload);
  }
}

// Worker saga will be  fired on auth/signUp action
function* handleSignUp(action: PayloadAction) {
  try {
    const response: AxiosResponse = yield call(createUserAPI, action.payload);
    if (response.status === 201) {
      yield put(authActions.signUpSuccess());
      toast.success("Signup success!");
    }
  } catch (error) {
    yield put(authActions.signUpFailed());
    toast.error("Signup failed!");
  }
}

// Start handleSignUp on each dispatched auth/signUp action
function* watchSignUp() {
  yield takeLeading(authActions.signUp.type, handleSignUp);
}

export default function* authSaga() {
  yield all([watchLoginFlow(), watchSignUp()]);
}
