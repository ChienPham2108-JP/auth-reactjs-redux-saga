import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface Token {
  _id: string;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tokens: Token[];
}

export interface AuthState {
  loading?: boolean;
  isLoggedIn: boolean;
  user?: User;
  token: string;
  signUp: ISignUpProps;
}

interface ISignUpProps {
  signUpSuccess: boolean;
  signUpFailue: boolean;
}

const initialState: AuthState = {
  user: undefined,
  loading: false,
  isLoggedIn: false,
  token: "",
  signUp: {
    signUpSuccess: false,
    signUpFailue: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<SignUpPayload>) {
      state.loading = true;
    },
    signUpSuccess(state) {
      state.isLoggedIn = false;
      state.loading = false;
      state.signUp.signUpSuccess = true;
    },
    signUpFailed(state) {
      state.loading = false;
      state.signUp.signUpFailue = true;
      state.signUp.signUpSuccess = false;
    },

    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
      state.signUp.signUpFailue = false;
      state.signUp.signUpSuccess = false;
    },
    loginSuccess(state, action: PayloadAction<AuthState>) {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    createAccount(state) {
      state.signUp.signUpSuccess = false;
    },

    logOut(state, actions: PayloadAction<AuthState>) {
      state.user = undefined;
      state.token = "";
      state.isLoggedIn = false;
      state.loading = false;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLogging = (state: any) => state.auth.loading;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
