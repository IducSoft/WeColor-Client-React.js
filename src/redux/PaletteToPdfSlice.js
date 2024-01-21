import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paletteForPdf:{},
};


export const PaletteToPdfSlice = createSlice({
    name: "paletteForPdf",
    initialState,
    reducers: {
        saveData: (state, {payload}) =>{
            state.paletteForPdf = {...payload};
        },
        deleteData:(state) => {
            state.paletteForPdf = {};
        },
    },
});

export const { saveData, deleteData } = PaletteToPdfSlice.actions;
export default PaletteToPdfSlice.reducer;