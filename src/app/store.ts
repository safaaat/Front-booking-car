import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './actions/counterSlice';
import { sidebarSlice } from './actions/sidebarSlice';
import { handleCarSlice } from './actions/handleCarSlice';
import { bookingSlice } from './actions/bookingSlice';
import { adminSlice } from './actions/adminSlice';
import { riwayatSlice } from './actions/riwayatSlice';
import { navbarSlice } from "./actions/navbarSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        sidebar: sidebarSlice.reducer,
        handleCar: handleCarSlice.reducer,
        bookingCar: bookingSlice.reducer,
        admin: adminSlice.reducer,
        riwayat: riwayatSlice.reducer,
        navbar: navbarSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch