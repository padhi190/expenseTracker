import { ReactNode, createContext, useContext, useReducer } from 'react';

const expenses = [
  {
    id: '1',
    description: 'Groceries',
    amount: 50.0,
    date: new Date('2024-02-25'),
  },
  {
    id: '2',
    description: 'Gasoline',
    amount: 40.0,
    date: new Date('2024-02-24'),
  },
  {
    id: '3',
    description: 'Dinner',
    amount: 30.0,
    date: new Date('2024-02-23'),
  },
  {
    id: '4',
    description: 'Movies',
    amount: 25.0,
    date: new Date('2024-02-22'),
  },
  {
    id: '5',
    description: 'Shopping',
    amount: 60.0,
    date: new Date('2024-02-21'),
  },
  { id: '6', description: 'Books', amount: 35.0, date: new Date('2024-02-20') },
  {
    id: '7',
    description: 'Clothing',
    amount: 45.0,
    date: new Date('2024-02-19'),
  },
  {
    id: '8',
    description: 'Electronics',
    amount: 70.0,
    date: new Date('2024-02-18'),
  },
  { id: '9', description: 'Coffee', amount: 5.0, date: new Date('2024-02-17') },
  {
    id: '10',
    description: 'Lunch',
    amount: 20.0,
    date: new Date('2024-02-16'),
  },
];

export type Expense = Omit<(typeof expenses)[0], 'id'>;
export type Expenses = typeof expenses;

type State = typeof initialState;

type Action =
  | {
      type: 'addExpense';
      data: Expense;
    }
  | {
      type: 'deleteExpense';
      id: string;
    }
  | {
      type: 'updateExpense';
      payload: {
        id: string;
        data: Expense;
      };
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'addExpense':
      const newExpense = { id: crypto.randomUUID(), ...action.data };
      return { expenses: [...state.expenses, newExpense] };
    case 'deleteExpense':
      const filtered = state.expenses.filter((exp) => exp.id !== action.id);
      return { expenses: filtered };
    case 'updateExpense':
      const idx = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      const newState = [...state.expenses];
      newState[idx] = { ...state.expenses[idx], ...action.payload.data };
      return { expenses: newState };
    default:
      throw new Error(`unhandled action`);
  }
}

type Context = {
  expenses: Expenses;
  addExpense: (data: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, data: Expense) => void;
};

const ExpenseContext = createContext<Context|null>(null);

const initialState = {
  expenses,
};

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    expenses: state.expenses,
    addExpense: (data: Expense) => dispatch({ type: 'addExpense', data }),
    deleteExpense: (id: string) => dispatch({ type: 'deleteExpense', id }),
    updateExpense: (id: string, data: Expense) =>
      dispatch({ type: 'updateExpense', payload: { id, data } }),
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default AppProvider;

export function useAppExpense() {
    const ctx = useContext(ExpenseContext);
    if (!ctx) throw new Error('Error reading context');
  return ctx;
}
