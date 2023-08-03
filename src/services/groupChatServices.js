import { instance } from "./instance";

export const attachFileToMessage = async (file) => {
  const { data } = await instance.post("/group-chat/attachment-file", file);
  return data;
};

export const readMessage = async (messageId) => {
  const { data } = await instance.post(`/read-message/${messageId}`);
  return data;
};

export const readAnswer = async (answerId) => {
  const { data } = await instance.post(`/read-answer/${answerId}`);
  return data;
};

export const loadMoreMessages = async (groupName, lastMessageId) => {
  const {data} = await instance.get(`/next-messages/${groupName}/${lastMessageId}`)
  return data
}
