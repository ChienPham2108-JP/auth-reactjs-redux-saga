import { PayloadAction } from "@reduxjs/toolkit";
import { createUserAPI, loginAPI, logOutAPI } from "../../api";
import { AxiosResponse } from "axios";
import { take, call, put, all, takeLeading, delay } from "redux-saga/effects";
import { authActions, AuthState, LoginPayload } from "./authSlice";

// saga for handle login
function* handleLogin(payload: LoginPayload) {
  try {
    const response: AxiosResponse<any, any> = yield call(loginAPI, payload);
    localStorage.setItem("access_token", response.data.token);
    yield put(authActions.loginSuccess(response.data));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

// saga for handle logout
function* handleLogOut(payload: AuthState) {
  console.log("Logout...", payload.user);

  try {
    yield call(logOutAPI, payload.token, payload.user);
    localStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
  }
}

// saga watch login/ logout
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      console.log("Logging");

      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );

      yield call(handleLogin, action.payload);
      continue;
    }

    console.log("watch logout");
    const action: PayloadAction<AuthState> = yield take(
      authActions.logOut.type
    );
    yield call(handleLogOut, action.payload);
  }
}

// saga for sign up
function* handleSignUp(action: PayloadAction) {
  yield delay(2000);
  try {
    const response: AxiosResponse = yield call(createUserAPI, action.payload);
    if (response.status === 201) {
      yield put(authActions.signUpSuccess());
    }
  } catch (error) {
    yield put(authActions.signUpFailed());
  }
}

// saga watch signup action
function* watchSignUp() {
  yield takeLeading(authActions.signUp.type, handleSignUp);
}

export default function* authSaga() {
  yield all([watchLoginFlow(), watchSignUp()]);
}
