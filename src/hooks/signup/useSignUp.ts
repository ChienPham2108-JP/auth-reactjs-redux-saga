import useApi from "api";

export const useSignUp = async (user: any) => {
  const api = useApi();
  return await api.path("/users").post(user);
};
