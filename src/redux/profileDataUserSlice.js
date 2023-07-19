import { createSlice } from "@reduxjs/toolkit";

export const profileDataUserSlice = createSlice({
    name:"profileDataUser",
    initialState:{
        isUpdated:true,
        userData:{
            name:"",
            country:"",
            occupation:"",
            biography:"",
            linkedin:"",
            twitter:"",
            instagram:"",
            portfolio:"",
        },
        
    },
    reducers:{
        updateData: (state, {payload})=>{
            console.log(payload)
        },
        updateFalse:(state)=>{
            state.isUpdated = false;
        },
        updateTrue:(state)=>{
            state.isUpdated = true;
        },
    },
})

export const {updateData, updateFalse, updateTrue} = profileDataUserSlice.actions;
export default profileDataUserSlice.reducer;