import { instance } from "./instance";

export const login = async (credentials) => {
  const { data } = await instance.post("auth/token", credentials);
  console.log(data);
  return data;
};

// export const uploadAvatar = async (file) => {
//   instance.defaults.headers["Content-Type"] = "multipart/form-data";
//   const { data } = await instance.put("/student/update/photo", file);
//   console.log(data);
//   return data
// };
