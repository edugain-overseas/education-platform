import { instance } from "./instance";

export const getLectureByTaskId = async (taskId) => {
  const { data } = await instance.get(`/lecture/${taskId}`);
  return data;
};
