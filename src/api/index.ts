import axios from "axios";
const defaultsBaseURL = process.env.REACT_APP_API_HOST;

export default function useApi() {
  const defaultOptions = () => {
    const options: any = {
      headers: {},
    };
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && accessToken !== "undefined") {
      options.headers.Authorization = `Bearer ${accessToken}`;
    }

    return options;
  };
  const executor = (url: string) => ({
    post: async (user: any) => await axios.post(url, user, defaultOptions()),
  });

  return {
    path: (path: string) => {
      const url = `${defaultsBaseURL}${path}`;

      return executor(url);
    },
  };
}

// const config = (token: any) => ({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Login a registered user api
// export const loginAPI = async (user: any) =>
//   await axios.post(`${defaultsBaseURL}/users/login`, user);

// // Create a new user api
// export const useSignUp = async (user: any) =>
//   await axios.post(`${defaultsBaseURL}/users`, user);

// // Log user out of the application
// export const logOutAPI = async (token: any, user: any) =>
//   await axios.post(`${defaultsBaseURL}/users/me/logout`, user, config(token));
