import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { take, call, put, all, takeLeading, retry } from "redux-saga/effects";

import { authActions, AuthState, LoginPayload } from "./authSlice";
import { createUserAPI, loginAPI, logOutAPI } from "../../api";

// Worker handle login
function* handleLogin(payload: LoginPayload) {
  try {
    const response: AxiosResponse<any, any> = yield call(loginAPI, payload);
    // set token to localStorage
    localStorage.setItem("access_token", response.data.token);

    yield put(authActions.loginSucces(response.data));
    toast.success("Login success!");
  } catch (error: any) {
    yield put(authActions.updateSatus("failue"));
    toast.error("Login failed! Check authentication credentials");
  }
}

// Worker handle logout
function* handleLogOut(payload: AuthState) {
  try {
    // yield call(logOutAPI, payload.token, payload.user);
    yield retry(2, 2000, logOutAPI, payload.token, payload.user);

    // remove token to localStorage
    yield localStorage.removeItem("access_token");
    // yield put(authActions.updateSatus("success"));
    yield put(authActions.logOutSuccess(payload));
    // toast.success("Logout success!");
  } catch (error) {
    yield localStorage.removeItem("access_token");
    yield put(authActions.updateSatus("failue"));
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
      yield put(authActions.updateSatus("success"));
      toast.success("Signup success!");
    }
  } catch (error) {
    yield put(authActions.updateSatus("failue"));
    toast.error(
      "Signup failed! Maybe your email address is in use by another member or ERROR CONNECTION"
    );
  }
}

// Start handleSignUp on each dispatched auth/signUp action
function* watchSignUp() {
  yield takeLeading(authActions.signUp.type, handleSignUp);
}

export default function* authSaga() {
  yield all([watchLoginFlow(), watchSignUp()]);
}
