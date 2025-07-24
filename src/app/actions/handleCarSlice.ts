import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";

export interface dataCar {
    id: number
    name: string
    image: string
}

export interface dataEditCar {
    id: number
    name: string
    image: string
    url?: string
}

interface SliceState {
    dataCar: dataCar[]
    isLoading: boolean
    isSuccess: boolean
    isError: string | null
    isMessage: string
    handleInputCar: boolean
    dataEditCar: dataEditCar | null
}

// Define the initial state using that type
const initialState: SliceState = {
    dataCar: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
    isMessage: "",
    handleInputCar: false,
    dataEditCar: null
};

export const getApiCars = createAsyncThunk("cars/fetchCars", async () => {
    const response = await axiosInstance.get("/car");
    return response.data;
});

type CarDataProps = {
    name: string;
    image1: File; // atau File kalau cuma 1 file
};

export const postApiCars = createAsyncThunk("cars/postCar",
    async (dataCar: CarDataProps, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/car", dataCar, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeCars = createAsyncThunk("cars/remove",
    async (arrayId: number[], { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete("/car/remove", {
                headers: { 'Content-Type': 'application/json' },
                data: { arrayId }
            });

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const handleCarSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        handleInputCar: (state, action: PayloadAction<boolean>) => {
            state.handleInputCar = action.payload;

            // Matikan scroll
            if (action.payload === true) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";

                state.isLoading = false;
                state.isSuccess = false;
                state.isError = null;
                state.isMessage = "";
                state.dataEditCar = null;
            }

        },
        handleEditCar: (state, action: PayloadAction<dataEditCar>) => {
            state.dataEditCar = action.payload;
        },
        resetCarState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = null;
            state.isMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // handle Get Car
            .addCase(getApiCars.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getApiCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataCar = action.payload;
            })
            .addCase(getApiCars.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message ?? null;
            })

            // Handle Post Car
            .addCase(postApiCars.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(postApiCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload?.message
            })
            .addCase(postApiCars.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })

            // Handle Remove Cars
            .addCase(removeCars.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(removeCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload?.message
            })
            .addCase(removeCars.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            });
    }
});

export const { handleInputCar, resetCarState, handleEditCar } = handleCarSlice.actions;
export default handleCarSlice.reducer;