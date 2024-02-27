import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from "../features/expenses/expenseSlice";

const store = configureStore({
    reducer: {
        expenses: expenseReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;