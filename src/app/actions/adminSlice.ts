import axiosInstance from "@/services/axiosInstance";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SliceState {
    dataAdmin: any;
    formAdmin: boolean;
    isLoading: boolean;
    isMessage: string;
    isError: string | null;
    isSuccess: boolean;
}

// Define the initial state using that type
const initialState: SliceState = {
    dataAdmin: null,
    formAdmin: false,
    isLoading: false,
    isMessage: "",
    isError: null,
    isSuccess: false
};

export const postLogin = createAsyncThunk("users/login",
    async (data: any,
        { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("users/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMe = createAsyncThunk("users/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("users/me", {
                withCredentials: true,
            });

            return response.data;
        } catch (error: any) {
            if (error.code === "ERR_NETWORK") {
                return rejectWithValue("Server tidak dapat dihubungi. Coba beberapa saat lagi.");
            }
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const logout = createAsyncThunk("post/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/users/logout",
                {}, // ⬅️ body (kosong)
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const adminSlice = createSlice({
    name: "name",
    initialState,
    reducers: {
        toggleLoginForm: (state, action: PayloadAction<boolean>) => {
            state.formAdmin = action.payload

            if (action.payload === true) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";

                state.isLoading = false;
                state.isMessage = "";
                state.isError = null;
                state.isSuccess = false;
            }
        },
        resetStateAdmin: (state) => {
            state.isLoading = false;
            state.isMessage = "";
            state.isError = null;
            state.isSuccess = false;
        },
        logoutAdmin: (state) => {
            state.dataAdmin = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle Post Car
            .addCase(postLogin.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(postLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload.message;
                state.dataAdmin = action.payload.data;
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })

            // Handle Get Me
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload.message;
                state.dataAdmin = action.payload.data;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })

            // Handle Get Me
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload.message;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })
    }
});

export const { toggleLoginForm, resetStateAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;