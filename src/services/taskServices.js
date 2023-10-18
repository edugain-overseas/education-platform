import { instance } from "./instance";

export const getLectureByTaskId = async (taskId) => {
  const { data } = await instance.get(`/lecture/${taskId}`);
  return data;
};

export const createLecture = async (lessonId) => {
  const { data } = await instance.post(`/lecture/create?lesson_id=${lessonId}`);
  return data
};

export const addTextPartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(`/lecture/text/${lectureId}`, partData);
  return data;
};

export const getTestByTaskId = async (taskId) => {
  const { data } = await instance.get(`/test/${taskId}`);
  return data;
};
