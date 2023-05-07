import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultPalettesAll:[],
};

export const resultPalettesFromExploreSlice = createSlice({
    name: "AllPalettesFromExplore",
    initialState,
    reducers: {
    resultFromAll: (state, payload) => {
      state.resultPalettesAll = [...payload.payload];
    },
}});

export const { resultFromAll } = resultPalettesFromExploreSlice.actions;

export default resultPalettesFromExploreSlice.reducer;