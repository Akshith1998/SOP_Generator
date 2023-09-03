import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendSOPDetails = createAsyncThunk(
  "sop/details",
  async (details) => {
    await axios({
      url: "http://localhost:3001/sopDetails",
      method: "POST",
      data: details,
    });
  }
);

export const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sectionIndex: 1,
    personalDetails: {
      email: "",
      fullname: "",
      age: "",
    },
    PreviousEducationDetails: {
      previousEducation: "",
      institute: "",
      study: "",
    },
    WorkExpDetails: { workExp: "" },
    AdmissionDetails: {
      instituteAdmitted: "",
      programStudy: "",
      applyingCountry: "",
      futureGoals: "",
      listening: "",
      reading: "",
      speaking: "",
      writing: "",
    },
    checkFocus: false,
    navigation: null,
  },
  reducers: {
    changeSection: (state, action) => {
      state.sectionIndex = action.payload;
    },
    updatePersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    updatePreviousEducation: (state, action) => {
      state.PreviousEducationDetails = action.payload;
    },
    updateWorkExp: (state, action) => {
      state.WorkExpDetails = action.payload;
    },
    updateAdmissionDetails: (state, action) => {
      state.AdmissionDetails = action.payload;
    },
    updateFocus: (state, action) => {
      state.checkFocus = action.payload;
    },
    updateNavigation: (state, action) => {
      state.navigation = action.payload;
    },
  },
});

export const {
  changeSection,
  updatePersonalDetails,
  updatePreviousEducation,
  updateWorkExp,
  updateAdmissionDetails,
  updateFocus,
  updateNavigation,
} = sectionSlice.actions;
