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
  status?: Status;
  user?: User;
  token: string;
}

export type Status = "" | "loading" | "success" | "failue";

const initialState: AuthState = {
  user: undefined,
  token: "",
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<SignUpPayload>) {
      state.status = "loading";
    },

    login(state, action: PayloadAction<LoginPayload>) {
      state.status = "loading";
    },

    loginSucces(state, action: PayloadAction<AuthState>) {
      state.status = "success";
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logOut(state, actions: PayloadAction<AuthState>) {
      state.status = "loading";
    },

    logOutSuccess(state, actions: PayloadAction<AuthState>) {
      state.user = undefined;
      state.status = "success";
      state.token = "";
    },

    updateSatus(state, actions: PayloadAction<Status>) {
      state.status = actions.payload;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
