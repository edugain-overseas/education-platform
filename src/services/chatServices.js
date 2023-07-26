import { instance } from "./instance";

export const attachFileToMessage = async (file) => {
  const { data } = await instance.post("/group-chat/attachment-file", file);
  console.log(data);
  return data;
};

export const readMessage = async (messageId) => {
  const { data } = await instance.post(`/read-message/${messageId}`);
  const readBy = data.read_by.split(",").map((id) => parseInt(id));
  console.log(readBy);
  return readBy;
};
