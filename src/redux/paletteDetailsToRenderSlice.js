import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOfDataOfPalette:{},
};


export const allOfDataOfPaletteSlice = createSlice({
    name: "allOfDataOfPalette",
    initialState,
    reducers: {
        saveDataPalette: (state, {payload}) =>{
            state.allOfDataOfPalette = {...payload};
        }
    },
});

export const { saveDataPalette } = allOfDataOfPaletteSlice.actions;
export default allOfDataOfPaletteSlice.reducer;