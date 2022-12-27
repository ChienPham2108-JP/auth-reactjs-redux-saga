import useApi from "api";

export const usePostLogIn = async (user: any) => {
  const api = useApi();
  return await api.path("/users/login").post(user);
};
