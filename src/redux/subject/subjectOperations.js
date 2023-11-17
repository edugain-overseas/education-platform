import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewLesson,
  addNewModule,
  attachFilesToInstruction,
  attachLinkToInstruction,
  createSubjectAbout,
  createSubjectInstruction,
  createSubjectInstructionCategory,
  deleteFileFromInstruction,
  deleteInstruction,
  deleteInstructionCategory,
  deleteLinkFromInstruction,
  getAllSubjectsByGroupName,
  getDopSubjectsByStudentId,
  getListOfParticipant,
  getSubjectAbout,
  getSubjectById,
  getSubjectIcons,
  getSubjectInstructions,
  getSubjectTapesById,
  updateSubjectAbout,
  updateSubjectById,
  updateSubjectImage,
  updateSubjectInstruction,
  updateSubjectInstructionCategory,
  updateSubjectLogo,
  uploadSubjectIcon,
} from "../../services/subjectServices";
import { instance } from "../../services/instance";
import { createLecture } from "../../services/taskServices";

export const getAllSubjectsThunk = createAsyncThunk(
  "subject/getAll",
  async (groupName, { rejectWithValue }) => {
    try {
      const response = await getAllSubjectsByGroupName(groupName);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getDopSubjectsByStudentIdThunk = createAsyncThunk(
  "subject/getDopById",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await getDopSubjectsByStudentId(studentId);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getSubjectTapesByIdThunk = createAsyncThunk(
  "subject/getTapesById",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectTapesById(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectAboutThunk = createAsyncThunk(
  "subject/getAbout",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectAbout(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSubjectAboutThunk = createAsyncThunk(
  "subject/createAbout",
  async ({ id, updatedSubjectAbout }, { rejectWithValue }) => {
    try {
      const response = await createSubjectAbout(id, updatedSubjectAbout);
      return { response, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectAboutThunk = createAsyncThunk(
  "subject/updateAbout",
  async ({ id, updatedSubjectAbout }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectAbout(id, updatedSubjectAbout);
      console.log(response);
      return { response, id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getListOfParticipantsThunk = createAsyncThunk(
  "subject/getParticipants",
  async ({ groupId, subjectId }, { rejectWithValue }) => {
    try {
      const response = await getListOfParticipant(groupId, subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectInstructionsThunk = createAsyncThunk(
  "subject/getInstructions",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectInstructions(subjectId);
      return { response, subjectId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSubjectInstructionCategoryThunk = createAsyncThunk(
  "subject/createInstructionCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const response = await createSubjectInstructionCategory(newCategory);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectInstructionCategoryThunk = createAsyncThunk(
  "subject/updateInstructionCategory",
  async ({ categoryId, credentials }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectInstructionCategory(
        categoryId,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSubjectInstructionThunk = createAsyncThunk(
  "subject/createInstruction",
  async (instructionData, { rejectWithValue }) => {
    try {
      const response = await createSubjectInstruction(instructionData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectInstructionThunk = createAsyncThunk(
  "subject/updateInstruction",
  async ({ instrId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectInstruction(instrId, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const attachFilesToInstructionThunk = createAsyncThunk(
  "subject/attachFilesToInsruction",
  async ({ instrId, files, filesAmount }, { rejectWithValue }) => {
    try {
      const response = await attachFilesToInstruction(
        instrId,
        files,
        filesAmount
      );
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const attachLinkToInstructionThunk = createAsyncThunk(
  "subject/attachLinkToInsruction",
  async ({ linkData }, { rejectWithValue }) => {
    try {
      const response = await attachLinkToInstruction(linkData);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFileFromInstructionThunk = createAsyncThunk(
  "subject/deleteFileFromInstruction",
  async ({ file }, { rejectWithValue }) => {
    try {
      const response = await deleteFileFromInstruction(file.fileId);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLinkFromInstructionThunk = createAsyncThunk(
  "subject/deleteLinkFromInstruction",
  async ({ linkId }, { rejectWithValue }) => {
    try {
      const response = await deleteLinkFromInstruction(linkId);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInstructionThunk = createAsyncThunk(
  "subject/deleteInstruction",
  async ({ instructionId }, { rejectWithValue }) => {
    try {
      const response = await deleteInstruction(instructionId);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInstructionCategoryThunk = createAsyncThunk(
  "subject/deleteInstructionCategory",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const response = await deleteInstructionCategory(categoryId);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectIconsThunk = createAsyncThunk(
  "subject/getIcons",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectIcons(subjectId);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadSubjectIconThunk = createAsyncThunk(
  "subject/uploadIcon",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await uploadSubjectIcon(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSubjectByIdThunk = createAsyncThunk(
  "subject/getById",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await getSubjectById(subjectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectByIdThunk = createAsyncThunk(
  "subject/updateById",
  async ({ subjectId, subjectData }, { rejectWithValue }) => {
    try {
      const response = await updateSubjectById(subjectId, subjectData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectImageThunk = createAsyncThunk(
  "subject/updateImage",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await updateSubjectImage(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      return response;
    } catch (error) {
      instance.defaults.headers["Content-Type"] = "application/json";
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubjectLogoThunk = createAsyncThunk(
  "subject/updateLogo",
  async ({ subjectId, file }, { rejectWithValue }) => {
    try {
      console.log("adadasd");
      instance.defaults.headers["Content-Type"] = "multipart/form-data";
      const response = await updateSubjectLogo(subjectId, file);
      instance.defaults.headers["Content-Type"] = "application/json";
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewLessonThunk = createAsyncThunk(
  "subject/addLesson",
  async ({ subjectId, data }, { rejectWithValue }) => {
    try {
      const response = await addNewLesson(data);
      const { id: lessonId, lesson_type: lessonType } = response;
      switch (lessonType) {
        case "lecture":
          const lecture = await createLecture(lessonId);
          response.lectureId = lecture.id;
          break;

        default:
          break;
      }
      console.log(response);
      return { subjectId, data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewModuleThunk = createAsyncThunk(
  "subject/addModule",
  async (moduleData, { rejectWithValue }) => {
    try {
      const response = await addNewModule(moduleData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
