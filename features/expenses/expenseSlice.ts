import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../Provider/store';

export type Expense = Omit<typeof expenses[0], 'id'>;
export type Expenses = typeof expenses;

const expenses = [
  {
    id: '1',
    description: 'Groceries',
    amount: 50.0,
    date: '2024-02-25',
  },
  {
    id: '2',
    description: 'Gasoline',
    amount: 40.0,
    date: '2024-02-24',
  },
  {
    id: '3',
    description: 'Dinner',
    amount: 30.0,
    date: '2024-02-23',
  },
  {
    id: '4',
    description: 'Movies',
    amount: 25.0,
    date: '2024-02-22',
  },
  {
    id: '5',
    description: 'Shopping',
    amount: 60.0,
    date: '2024-02-21',
  },
  { id: '6', description: 'Books', amount: 35.0, date: '2024-02-20' },
  {
    id: '7',
    description: 'Clothing',
    amount: 45.0,
    date: '2024-02-19',
  },
  {
    id: '8',
    description: 'Electronics',
    amount: 70.0,
    date: '2024-02-18',
  },
  { id: '9', description: 'Coffee', amount: 5.0, date: '2024-02-17' },
  {
    id: '10',
    description: 'Lunch',
    amount: 20.0,
    date: '2024-02-16',
  },
];

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: expenses,
  reducers: {
    expenseAdded: (state, action: PayloadAction<Expense>) => {
      state.push({ id: Math.random().toString(), ...action.payload });
    },
    expenseDeleted: (state, action: PayloadAction<string>) => {
      const idx = state.findIndex((exp) => exp.id === action.payload);
      state.splice(idx, 1);
    },
    expenseUpdated: (
      state,
      action: PayloadAction<{ id: string; data: Expense }>
    ) => {
      const idx = state.findIndex((exp) => exp.id === action.payload.id);
      state.splice(idx, 1, { id: action.payload.id, ...action.payload.data });
    },
  },
});

export default expenseSlice.reducer;

export const { expenseAdded, expenseDeleted, expenseUpdated} = expenseSlice.actions;

export const selectExpenses = (state: RootState) => state.expenses;
