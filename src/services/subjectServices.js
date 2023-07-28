import { instance } from "./instance";

export const getAllSubjectsByGroupName = async (groupName) => {
  const { data } = await instance.get(`/subject/group/${groupName}`);
  return data;
};

export const getTeachersForSubject = async (subjectId) => {
  const { data } = await instance.get(`/subject/${subjectId}/teachers`);
  return data;
};

export const getNextThreeLessons = async (subjectId) => {
  const { data } = await instance.get(`/subject/${subjectId}/next-lesson`);
  return data;
};
