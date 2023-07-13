import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useDispatch, useGlobalState } from 'store/context';
import { ManageExpenseNavigationProps } from 'types';
import { ExpenseType } from 'models';
import { IconButton, Button } from 'components';
import theme from 'styles/theme';

export interface ManageExpenseParams {
  expenseId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const { expenseId } = route.params || {};

  const isEdting = !!expenseId;

  const { expenses } = useGlobalState();
  const dispatch = useDispatch();

  const closeModal = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    const filteredExpenses = expenses.filter((expense: ExpenseType) => expense.id !== expenseId);
    dispatch({ expenses: filteredExpenses });
    closeModal();
  };

  const cancelHandler = () => {
    closeModal();
  };

  const confirmHandler = () => {
    if (!isEdting) {
      const dummyNewExpense = {
        description: 'Test New Expense',
        amount: 29.99,
        date: new Date('2023-08-13'),
      };
      const id = new Date().toString() + Math.random().toString();
      dispatch({ expenses: [{ ...dummyNewExpense, id }, ...expenses] });
    } else {
      const dummyEditExpense = { description: 'Test', amount: 19.99, date: new Date('2023-07-12') };
      const updatableExpenseIndex = expenses.findIndex(
        (expense: ExpenseType) => expense.id === expenseId,
      );
      const updatableExpense = expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...dummyEditExpense };
      const updatedExpenses = [...expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;

      dispatch({ expenses: updatedExpenses });
    }
    closeModal();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${isEdting ? 'Edit' : 'Add'} Expense`,
    });
  }, [isEdting, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEdting ? 'Confirm' : 'Add'}
        </Button>
        <Button style={styles.button} flat onPress={cancelHandler}>
          Cancel
        </Button>
      </View>
      {isEdting && (
        <View style={styles.deleteContainers}>
          <IconButton
            icon="delete"
            color={theme().colors.erro500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: theme().colors.primary800,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '45%',
  },
  deleteContainers: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: theme().colors.primary200,
    alignItems: 'center',
  },
});
