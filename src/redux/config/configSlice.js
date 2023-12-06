import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEdit: false,
  isSubmit: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setEdit(state, _) {
      state.isEdit = true;
    },
    setSumbit(state, _) {
      state.isSubmit = true;
    },
    setDefault(state, _) {
      state.isEdit = false;
      state.isSubmit = false;
    },
    setUnsubmit(state, _) {
      state.isSubmit = false;
    },
  },
});

export const { setEdit, setSumbit, setDefault, setUnsubmit } =
  configSlice.actions;
