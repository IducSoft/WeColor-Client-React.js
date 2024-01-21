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
        },
        deleteDataPalette:(state) => {
            state.allOfDataOfPalette = {};
        },
    },
});

export const { saveDataPalette, deleteDataPalette } = allOfDataOfPaletteSlice.actions;
export default allOfDataOfPaletteSlice.reducer;