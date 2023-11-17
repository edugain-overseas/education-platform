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

export const createSubjectInstruction = async (instructionData) => {
  const { data } = await instance.post("/subject/instruction", instructionData);
  return data;
};

export const updateSubjectInstruction = async (instrId, updatedData) => {
  const { data } = await instance.put(
    `/subject/instruction?instruction_id=${instrId}`,
    updatedData
  );
  return data;
};

export const attachFilesToInstruction = async (
  instructionId,
  files,
  filesAmount
) => {
  const formData = new FormData();

  [...files].forEach((file) => {
    formData.append("files", file);
  });

  // const fileTypes = [...files].map(({ name }) => name.split(".").pop());
  instance.defaults.headers["Content-Type"] = "multipart/form-data";

  const { data: filesResponse } = await instance.post(
    "/subject/instruction/file",
    formData
  );

  instance.defaults.headers["Content-Type"] = "application/json";

  const newFiles = await Promise.all(
    filesResponse.map(async (file, index) => {
      const { data } = await instance.post(
        "/subjects/instruction/attach-file",
        {
          subject_instruction_id: instructionId,
          number: filesAmount + 1 + index,
          file_type: file.fileType,
          filename: file.fileName,
          file_size: file.fileSize,
          file_path: file.filePath,
        }
      );
      return data;
    })
  );

  return newFiles;
};

export const attachLinkToInstruction = async (linkData) => {
  const { data } = await instance.post("/subject/instruction/link", linkData);
  return data;
};

export const deleteFileFromInstruction = async (fileId) => {
  const { data } = await instance.delete(
    `/subject/instruction/file?file_id=${fileId}`
  );
  return data;
};

export const deleteLinkFromInstruction = async (linkId) => {
  const { data } = await instance.delete(
    `/subject/instruction/link?instruction_link_id=${linkId}`
  );
  return data;
};

export const deleteInstruction = async (instructionId) => {
  const { data } = await instance.delete(
    `/subject/instruction?instruction_id=${instructionId}`
  );
  return data;
};

export const deleteInstructionCategory = async (categoryId) => {
  const { data } = await instance.delete(
    `/subject/instruction/category?instruction_category_id=${categoryId}`
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
  const { data } = await instance.put(`subject/update/${id}/logo`, file);
  return data;
};

export const addNewLesson = async (lesson) => {
  const { data } = await instance.post("lesson/create", lesson);
  return data;
};

export const addNewModule = async (moduleData) => {
  const { data } = await instance.post("/module/create", moduleData);
  return data;
};
