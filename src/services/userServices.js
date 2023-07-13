import { instance } from "./instance";

export const login = async (credentials) => {
  const { data } = await instance.post("auth/token", credentials);
  return data;
};

export const getUserInfo = async () => {
  const { data } = await instance.get("/student/info/me");
  return data;
};

export const changeAvatar = async (file) => {
  const { data } = await instance.put("/student/update/photo", file);
  return data;
};

export const logout = async () => {
  const { data } = await instance.post("/logout");
  return data
};
