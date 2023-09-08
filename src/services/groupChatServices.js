import { instance } from "./instance";

export const attachFileToMessage = async (file) => {
  const { data } = await instance.post("/group-chat/attachment-file", file);
  return data;
};

export const attachFileToSubjectMessage = async (file) => {
  const { data } = await instance.post("/subject_chat/attachment-file", file);
  return data;
};

export const readMessage = async (messageId) => {
  const { data } = await instance.post(`/read-message/${messageId}`);
  return data;
};

export const readSubjectMessage = async (messageId) => {
  const { data } = await instance.post(
    `/subject_chat/read_message/${messageId}`
  );
  return data;
};

export const readAnswer = async (answerId) => {
  const { data } = await instance.post(`/read-answer/${answerId}`);
  return data;
};

export const readSubjectAnswer = async (answerId) => {
  const { data } = await instance.post(`/subject_chat/read_answer/${answerId}`);
  return data;
};

export const loadMoreMessages = async (groupName, lastMessageId) => {
  const { data } = await instance.get(
    `/next-messages/${groupName}/${lastMessageId}`
  );
  return data;
};

export const loadMoreSubjectMessages = async (subjectId, lasMessageId) => {
  const { data } = await instance.get(
    `/subject_chat/next-messages/${subjectId}/${lasMessageId}`
  );
  return data;
};
