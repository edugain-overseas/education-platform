import { instance } from "./instance";

export const getAllSubjectsByGroupName = async (groupName) => {
  const { data } = await instance.get(`/subject/group/${groupName}`);
  return data;
};

export const getSubjectTapesById = async (subjectId) => {
  const { data } = await instance.get(`/subject-tapes/${subjectId}`);
  return data;
};

export const getSubjectAbout = async (subjectId) => {
  const { data } = await instance.get(`subject-item/read`, {
    params: { subject_id: subjectId },
  });
  return data;
};
