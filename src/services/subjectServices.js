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
  const { data } = await instance.put(`subject-item/update?subject_id=${subjectID}`, subjectAbout);
  return data
};

export const getListOfParticipant = async (groupId, subjectId) => {
  console.log(groupId, subjectId);
  const {data} = await instance.get(`list-members?group_id=${groupId}&subject_id=${subjectId}`)
  console.log(data);
  return data
}
