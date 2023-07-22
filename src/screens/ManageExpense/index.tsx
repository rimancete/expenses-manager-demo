import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { ManageExpenseNavigationProps } from 'types';
import { IconButton, ExpenseForm } from 'components';
import theme from 'styles/theme';
import { ExpenseType } from 'models';
import { useGlobalState } from 'hooks';

export interface ManageExpenseParams {
  expenseId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const { createExpense, updateExpense, deleteExpense, expenses } = useGlobalState();

  const { expenseId } = route.params || {};

  const isEditing = !!expenseId;

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const closeModal = () => {
    navigation.goBack();
  };

  const cancelHandler = () => {
    closeModal();
  };

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId as string);
    navigation.goBack();
  };

  const submit = (expenseData: ExpenseType) => {
    if (!isEditing) {
      createExpense(expenseData);
    } else {
      updateExpense(expenseData, expenseId);
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${isEditing ? 'Edit' : 'Add'} Expense`,
    });
  }, [isEditing, navigation]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={submit}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Save' : 'Add'}
        defaultValues={selectedExpense}
      />
      {isEditing && (
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
  deleteContainers: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: theme().colors.primary200,
    alignItems: 'center',
  },
});
