import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultPalettesAll:[],
  typeSearch:null,
};

export const resultPalettesFromExploreSlice = createSlice({
    name: "AllPalettesFromExplore",
    initialState,
    reducers: {
    resultFromAll: (state, payload) => {
      state.resultPalettesAll = payload.payload;
    },
    typeSearching:(state, payload)=>{
      state.typeSearch = payload.payload;
    },
    
}});

export const { resultFromAll, typeSearching} = resultPalettesFromExploreSlice.actions;

export default resultPalettesFromExploreSlice.reducer;