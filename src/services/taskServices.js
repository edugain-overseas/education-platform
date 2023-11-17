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
    `/lecture/create/homework?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const addHomeworkPartToLecture = async (lectureId, partData) => {
  const { data } = await instance.post(
    `/lecture/create/homework?lecture_id=${lectureId}`,
    partData
  );
  return data;
};

export const getTestByTaskId = async (taskId) => {
  const { data } = await instance.get(`/test/${taskId}`);
  return data;
};

export const updateLectureText = async (attrId, updatedData) => {
  const { data } = await instance.put(
    `/lecture/update/text?attribute_id=${attrId}`,
    updatedData
  );
  return data;
};

export const updateLectureSingleFile = async (attrId, updatedData) => {
  const { data } = await instance.put(
    `/lecture/update/file?attribute_id=${attrId}`,
    updatedData
  );
  return data;
};

export const updateLectureFiles = async (attrId, updatedData) => {
  const { data } = await instance.put(
    `/lecture/update/files?attribute_id=${attrId}`,
    updatedData
  );
  return data;
};

export const updateLectureImages = async (attrId, updatedData) => {
  const { data } = await instance.put(
    `/lecture/update/images?attribute_id=${attrId}`,
    updatedData
  );
  return data;
};

export const updateLectureLink = async (attrId, updatedData) => {
  const { data } = await instance.put(
    `/lecture/update/link?attribute_id=${attrId}`,
    updatedData
  );
  return data;
};

export const deleteLectureFile = async (filePath) => {
  const { data } = await instance.delete(
    `/lecture/delete/section-file?file_path=${filePath}`
  );
  return data;
};

export const deleteSection = async (attrId) => {
  const { data } = await instance.delete(
    `/lecture/delete/section?attribute_id=${attrId}`
  );
  return data;
};
