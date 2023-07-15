import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useGlobalState } from 'hooks';
import { ManageExpenseNavigationProps } from 'types';
import { IconButton, Button, ExpenseForm } from 'components';
import theme from 'styles/theme';

export interface ManageExpenseParams {
  expenseId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const { createExpense, updateExpense, deleteExpense } = useGlobalState();

  const { expenseId } = route.params || {};

  const isEdting = !!expenseId;

  const closeModal = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId as string);
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
        date: new Date('2023-07-13'),
      };

      createExpense(dummyNewExpense);
    } else {
      const dummyEditExpense = { description: 'Test', amount: 19.99, date: new Date('2023-07-12') };

      updateExpense(dummyEditExpense, expenseId);
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
      <ExpenseForm />
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
