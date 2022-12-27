import useApi from "api";

export const useLogOut = async (user: any) => {
  const api = useApi();
  return await api.path("/users/me/logout").post(user);
};
