import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSubjectsByGroupName } from "../../services/subjectServices";

export const getAllSubjects = createAsyncThunk(
    'subject/getAll',
    async (groupName, {rejectWithValue}) => {
        try {
            const response = await getAllSubjectsByGroupName(groupName)
            return response
        } catch (error) {
            rejectWithValue(error)
        }
    }
)