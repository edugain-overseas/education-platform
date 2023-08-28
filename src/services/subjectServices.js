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
  const { data } = await instance.get(
    `subject-item/read?subject_id=${subjectId}`
  );
  return data;
};

export const updateSubjectAbout = async (subjectID, subjectAbout) => {
  const { data } = await instance.put(
    `subject-item/update?subject_id=${subjectID}`,
    subjectAbout
  );
  return data;
};

export const getListOfParticipant = async (groupId, subjectId) => {
  const { data } = await instance.get(
    `list-members?group_id=${groupId}&subject_id=${subjectId}`
  );
  return data;
};

export const getSubjectIcons = async (subjectId) => {
  const { data } = await instance.get(
    `subject-item/icons?subject_id=${subjectId}`
  );
  return data;
};

export const uploadSubjectIcon = async (subjectId, file) => {
  const { data } = await instance.post(
    `subject-item/upload-icon?is_default=false&subject_id=${subjectId}`,
    file
  );
  return data;
};
