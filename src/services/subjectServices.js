import { instance } from "./instance";

export const getAllSubjectsByGroupName = async (groupName) => {
  const { data } = await instance.get(`/subject/group/${groupName}`);
  return data;
};

export const getDopSubjectsByStudentId = async (studentId) => {
  const { data } = await instance.get(`/dop_subjects/${studentId}`);
  return data;
};

export const getSubjectTapesById = async (subjectId) => {
  const { data } = await instance.get(`/subject-tapes/${subjectId}`);
  return data;
};

export const getSubjectAbout = async (subjectId) => {
  const { data } = await instance.get(
    `/subject-item/read?subject_id=${subjectId}`
  );
  return data;
};

export const createSubjectAbout = async (subjectId, subjectAbout) => {
  const { data } = await instance.post(
    `/subject-item/create?subject_id=${subjectId}`,
    subjectAbout
  );
  return data;
};

export const updateSubjectAbout = async (subjectId, subjectAbout) => {
  const { data } = await instance.put(
    `/subject-item/update?subject_id=${subjectId}`,
    subjectAbout
  );
  return data;
};

export const getListOfParticipant = async (groupId, subjectId) => {
  const { data } = await instance.get(
    `/list-members?group_id=${groupId}&subject_id=${subjectId}`
  );
  return data;
};

export const getSubjectInstructions = async (subjectId) => {
  const { data } = await instance.get(`/subject/${subjectId}/instruction`);
  data.sort((itemA, itemB) => itemA.categoryNumber - itemB.categoryNumber);
  return data;
};

export const createSubjectInstructionCategory = async (newCategoryData) => {
  const { data } = await instance.post(
    "subject/instruction/category",
    newCategoryData
  );
  return data;
};

export const updateSubjectInstructionCategory = async (
  categoryId,
  credentials
) => {
  const { data } = await instance.put(
    `subject/instruction/category?instruction_category_id=${categoryId}`,
    credentials
  );
  return data;
};

export const getSubjectIcons = async (subjectId) => {
  const { data } = await instance.get(
    `/subject-item/icons?subject_id=${subjectId}`
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

export const getSubjectById = async (id) => {
  const { data } = await instance.get(`subject/${id}`);
  return data;
};

export const updateSubjectById = async (id, subjectData) => {
  const { data } = await instance.put(`subject/${id}/update/info`, subjectData);
  return data;
};

export const updateSubjectImage = async (id, file) => {
  const { data } = await instance.put(`subject/update/${id}/photo`, file);
  return data;
};

export const updateSubjectLogo = async (id, file) => {
  console.log(id, file);
  const { data } = await instance.put(`subject/update/${id}/logo`, file);
  return data;
};

export const addNewLesson = async (lesson) => {
  const { data } = await instance.post("lesson/create", lesson);
  return data;
};
