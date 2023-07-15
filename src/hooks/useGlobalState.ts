import { ExpenseType } from 'models';
import { GlobalStateType } from 'models/globalState.model';
import { useGlobalState as getGlobalState, useDispatch } from 'store/context';

export default function useGlobalState() {
  const { expenses } = getGlobalState() as GlobalStateType;
  const dispatch = useDispatch();

  const createExpense = (newExpense: ExpenseType) => {
    const id = new Date().toString() + Math.random().toString();

    dispatch({ expenses: [{ ...newExpense, id }, ...expenses] });
  };

  const updateExpense = (editableExpense: ExpenseType, expenseId: string) => {
    const updatableExpenseIndex = expenses.findIndex((expense) => expense.id === expenseId);
    const updatableExpense = expenses[updatableExpenseIndex];
    const updatedItem = { ...updatableExpense, ...editableExpense };
    const updatedExpenses = [...expenses];
    updatedExpenses[updatableExpenseIndex] = updatedItem;

    dispatch({ expenses: updatedExpenses });
  };

  const deleteExpense = (expenseId: string) => {
    const filteredExpenses = expenses.filter((expense: ExpenseType) => expense.id !== expenseId);
    dispatch({ expenses: filteredExpenses });
  };

  return {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}
