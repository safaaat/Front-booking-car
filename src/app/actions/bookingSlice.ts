import axiosInstance from "@/services/axiosInstance";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DataBookingProps {
    id: number
    id_car: number
    is_confirmed: boolean
    name_car: string
    url_images: string
    name_user: string
    email: string
    phone_number: number
    start_time: number
    end_time: number
}

// Define a type for the slice state
interface SliceState {
    dataBookingCars: DataBookingProps[]
    formBooking: boolean
    isLoading: boolean
    isError: string | null
    isSuccess: boolean
    isMessage: string
}

// Define the initial state using that type
const initialState: SliceState = {
    dataBookingCars: [],
    formBooking: false,
    isLoading: false,
    isError: null,
    isSuccess: false,
    isMessage: ""
};

export const getBookingCars = createAsyncThunk("get/booking",
    async () => {
        const response = await axiosInstance.get("/booking");
        return response.data;
    }
);

export const postBooking = createAsyncThunk("post/booking",
    async (dataBooking: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/booking", dataBooking, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const confirmasiBookings = createAsyncThunk("patch/confirmasi_booking",
    async (data: { id: number, id_car: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/confirmasi_booking/${data.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeBookings = createAsyncThunk("remove/booking",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/booking/remove/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        handleFormBooking: (state, action: PayloadAction<boolean>) => {
            state.formBooking = action.payload;

            if (action.payload === true) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
                state.isLoading = false;
                state.isError = null;
                state.isSuccess = false;
                state.isMessage = "";
            }

        },
        resetStateApiBooking: (state) => {
            state.isLoading = false;
            state.isError = null;
            state.isSuccess = false;
            state.isMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle Post Booking
            .addCase(postBooking.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(postBooking.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload?.message
            })
            .addCase(postBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })

            // handle Get Car
            .addCase(getBookingCars.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getBookingCars.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataBookingCars = action.payload;
            })
            .addCase(getBookingCars.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message ?? null;
            })

            // Handle Post Booking
            .addCase(confirmasiBookings.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(confirmasiBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload?.message
            })
            .addCase(confirmasiBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })

            // handle Get Car
            .addCase(removeBookings.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = null;
            })
            .addCase(removeBookings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = null;
                state.isMessage = action.payload?.message
            })
            .addCase(removeBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = action.payload as string;
                state.isMessage = (action.payload as { message: string })?.message;
            })
    }
});

export const { handleFormBooking, resetStateApiBooking } = bookingSlice.actions;
export default bookingSlice.reducer;