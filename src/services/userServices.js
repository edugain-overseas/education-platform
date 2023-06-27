import { instance } from "./instance";

export const login = async (credentials) => {
  const { data } = await instance.post("auth/token", credentials);
  console.log(data);
  return data;
};

export const getUserInfo = async () => {
  const {data} = await instance.get('/student/info/me');
  console.log(data);
  return data;
}


