import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSubjectsThunk,
  getListOfParticipantsThunk,
  getSubjectAboutThunk,
  getSubjectByIdThunk,
  getSubjectIconsThunk,
  getSubjectTapesByIdThunk,
  createSubjectAboutThunk,
  updateSubjectAboutThunk,
  updateSubjectByIdThunk,
  updateSubjectImageThunk,
  updateSubjectLogoThunk,
  uploadSubjectIconThunk,
  getSubjectInstructionsThunk,
  getDopSubjectsByStudentIdThunk,
  addNewLessonThunk,
  createSubjectInstructionCategoryThunk,
  updateSubjectInstructionCategoryThunk,
} from "./subjectOperations";
import { v4 } from "uuid";

const subjectAbout = [
  {
    section_id: 1,
    section_type: "items",
    section_title: "Title",
    section_display: true,
    section_description: "description",
    section_items: [
      {
        id: v4(),
        image_path: "path/to/file",
        title: "Title1",
        text: "text1",
      },
    ],
  },
  {
    section_id: 2,
    section_type: "steps",
    section_title: "Title",
    section_display: true,
    section_description: "description",
    section_items: [
      {
        id: v4(),
        image_path: "path/to/file",
        title: "Title1",
        text: "text1",
      },
    ],
  },
  {
    section_id: 3,
    section_type: "program",
    section_title: "Title",
    section_display: true,
    section_description: "description",
    section_filepath: "static/program/deklar-prybutok-274 (1).xls",
    section_items: [
      {
        id: v4(),
        text: "Title1",
        items: [
          {
            id: v4(),
            text: "text1",
          },
        ],
      },
      {
        id: v4(),
        text: "ExamTitle",
        items: [],
      },
    ],
  },
  {
    section_id: 4,
    section_type: "teachers",
    section_title: "Title",
    section_display: true,
    section_description: "description",
    section_items: [
      {
        id: v4(),
        image_path: "",
        title: "Title1",
        text: "text1",
      },
    ],
  },
];

const initialState = {
  groupSubjects: [],
  dopSubjects: [],
  subjectsData: [],
  isLoading: false,
  subjectsAbout: [{ id: 0, data: subjectAbout }],
  subjectsParticipants: [],
  subjectsMainInfo: [],
  subjectsInstructions: [],
  icons: [],
  error: null,
};

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjectsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSubjectsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.groupSubjects = payload;
      })
      .addCase(getAllSubjectsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getDopSubjectsByStudentIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getDopSubjectsByStudentIdThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.dopSubjects = payload;
        }
      )
      .addCase(
        getDopSubjectsByStudentIdThunk.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )

      .addCase(getSubjectTapesByIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectTapesByIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const { response, subjectId } = payload;
        state.subjectsData = state.subjectsData.filter(
          (subject) => subject.id !== subjectId
        );
        state.subjectsData = [
          ...state.subjectsData,
          { id: subjectId, ...response },
        ];
      })
      .addCase(getSubjectTapesByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getSubjectAboutThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectAboutThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const { response, subjectId } = payload;
        if (!response.length) {
          return;
        }

        state.subjectsAbout = [
          ...state.subjectsAbout.filter((item) => item.id !== subjectId),
          { id: subjectId, data: response },
        ];
      })
      .addCase(getSubjectAboutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createSubjectAboutThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSubjectAboutThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const { response, id } = action.payload;

        state.subjectsAbout = [
          ...state.subjectsAbout.filter((item) => item.id !== id),
          { id, data: response },
        ];
      })
      .addCase(createSubjectAboutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateSubjectAboutThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubjectAboutThunk.fulfilled, (state, action) => {
        state.isLoading = false;

        const { response, id } = action.payload;

        state.subjectsAbout = [
          ...state.subjectsAbout.filter((item) => item.id !== id),
          { id, data: response },
        ];
      })
      .addCase(updateSubjectAboutThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getListOfParticipantsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListOfParticipantsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const { response, subjectId } = payload;

        state.subjectsParticipants = [
          ...state.subjectsParticipants.filter((item) => item.id !== subjectId),
          { id: subjectId, data: response },
        ];
      })
      .addCase(getListOfParticipantsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getSubjectInstructionsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectInstructionsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const { response, subjectId } = payload;

        state.subjectsInstructions = [
          ...state.subjectsInstructions.filter((item) => item.id !== subjectId),
          { id: subjectId, data: response },
        ];
      })
      .addCase(getSubjectInstructionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(createSubjectInstructionCategoryThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createSubjectInstructionCategoryThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;

          state.subjectsInstructions = [
            ...state.subjectsInstructions.map((item) => {
              if (item.id !== payload.subject_id) {
                item.data.push({
                  courseNumber: 1,
                  category: payload.category_name,
                  categoryNumber: payload.number,
                  categoryIsView: payload.is_view,
                  categoryId: payload.id,
                  instructions: [],
                });
              }
              return item;
            }),
          ];
        }
      )
      .addCase(
        createSubjectInstructionCategoryThunk.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )

      .addCase(updateSubjectInstructionCategoryThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateSubjectInstructionCategoryThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.subjectsInstructions = [
            ...state.subjectsInstructions.map((item) => {
              if (item.id !== payload.subject_id) {
                item.data = item.data.map((category) => {
                  if (category.categoryId === payload.id) {
                    return {
                      courseNumber: 1,
                      category: payload.category_name,
                      categoryId: payload.id,
                      categoryNumber: payload.number,
                      categoryIsView: payload.is_view,
                      instructions: category.instructions,
                    };
                  }
                  return category;
                });
              }
              return item;
            }),
          ];
        }
      )
      .addCase(
        updateSubjectInstructionCategoryThunk.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )

      .addCase(getSubjectIconsThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectIconsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.icons = payload;
      })
      .addCase(getSubjectIconsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(uploadSubjectIconThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadSubjectIconThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.icons = [...state.icons, payload];
      })
      .addCase(uploadSubjectIconThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(getSubjectByIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubjectByIdThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.subjectsMainInfo = [
          ...state.subjectsMainInfo.filter((item) => item.id !== payload.id),
          payload,
        ];
      })
      .addCase(getSubjectByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateSubjectByIdThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubjectByIdThunk.fulfilled, (state, _) => {
        state.isLoading = false;
      })
      .addCase(updateSubjectByIdThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateSubjectImageThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubjectImageThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(updateSubjectImageThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(updateSubjectLogoThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubjectLogoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(updateSubjectLogoThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(addNewLessonThunk.pending, (state, _) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewLessonThunk.fulfilled, (state, _) => {
        state.isLoading = false;
      })
      .addCase(addNewLessonThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});
