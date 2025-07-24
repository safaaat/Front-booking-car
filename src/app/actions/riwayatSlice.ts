import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import type { DataBookingProps } from "./bookingSlice";

// Define a type for the slice state
interface SliceState {
    dataRiwayat: DataBookingProps[],
    isLoading: boolean;
    isMessage: string;
    isError: string | null;
    isSuccess: boolean;
}

// Define the initial state using that type
const initialState: SliceState = {
    dataRiwayat: [],
    isLoading: false,
    isMessage: "",
    isError: null,
    isSuccess: false
}

export const getRiwayat = createAsyncThunk("get/register", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get("/riwayat");
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || err.message);
    }
});

export const riwayatSlice = createSlice({
    name: "name",
    initialState,
    reducers: {
        resetStateApis: (state) => {
            state.isLoading = false
            state.isMessage = ""
            state.isError = null
            state.isSuccess = false
        }
    },
    extraReducers(builder) {
        builder
            // handle Get Car
            .addCase(getRiwayat.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getRiwayat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataRiwayat = action.payload;
            })
            .addCase(getRiwayat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message ?? null;
            })
    },
});

export const { } = riwayatSlice.actions;
export default riwayatSlice.reducer;