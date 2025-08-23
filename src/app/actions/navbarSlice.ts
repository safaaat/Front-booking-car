import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface navbarSliceProps {
    isActiveLanguage: boolean;
}

// Define the initial state using that type
const initialState: navbarSliceProps = {
    isActiveLanguage: false,
};

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        handleActiveNavbar: (state) => {
            state.isActiveLanguage = !state.isActiveLanguage;
        }
    },
});

export const { handleActiveNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;