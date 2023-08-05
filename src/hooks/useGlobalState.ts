import { RequestBodyType } from 'models';
import { GlobalStateType } from 'models/globalState.model';
import { useGlobalState as getGlobalState, useDispatch } from 'store/context';

export default function useGlobalState() {
  const { expenses } = getGlobalState() as GlobalStateType;
  const dispatch = useDispatch();

  const createExpense = (newExpense: RequestBodyType) => {
    dispatch({ expenses: [newExpense, ...expenses] });
  };

  const updateExpense = (editableExpense: RequestBodyType, expenseId: string) => {
    const updatableExpenseIndex = expenses.findIndex((expense) => expense.id === expenseId);
    const updatableExpense = expenses[updatableExpenseIndex];
    const updatedItem = { ...updatableExpense, ...editableExpense };
    const updatedExpenses = [...expenses];
    updatedExpenses[updatableExpenseIndex] = updatedItem;

    dispatch({ expenses: updatedExpenses });
  };

  const deleteExpense = (expenseId: string) => {
    const filteredExpenses = expenses.filter(
      (expense: RequestBodyType) => expense.id !== expenseId,
    );
    dispatch({ expenses: filteredExpenses });
  };

  const setExpenses = (newExpenses: RequestBodyType[]) => {
    const orderedExpenses = newExpenses.reverse();
    dispatch({ expenses: orderedExpenses });
  };

  return {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
    setExpenses,
  };
}
