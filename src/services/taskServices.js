import { instance } from "./instance";

export const getLectureByTaskId = async (taskId) => {
  const { data } = await instance.get(`/lecture/${taskId}`);
  return data;
};

export const createLecture = async (lessonId) => {
  const { data } = await instance.post(`/lecture/create?lesson_id=${lessonId}`);
  return data;
};

export const addTextPartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(
    `/lecture/create/text?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const addSingleFilePartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(
    `/lecture/create/file?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const addImagesPartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(
    `/lecture/create/images?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const addMultipleFilesPartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(
    `/lecture/create/files?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const getTestByTaskId = async (taskId) => {
  const { data } = await instance.get(`/test/${taskId}`);
  return data;
};

