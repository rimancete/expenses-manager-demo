import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ManageExpenseNavigationProps } from 'types';
import { IconButton, ExpenseForm, LoadingOverlay, ErrorOverlay } from 'components';
import theme from 'styles/theme';
import { RequestBodyType } from 'models';
import { useGlobalState } from 'hooks';
import { request } from 'hooks/utils';

export interface ManageExpenseParams {
  expenseId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const deleteExpenseHandler = async () => {
    setIsFetching(true);
    const response = await request({ method: 'delete', body: { id: expenseId } });
    if (response?.errorMessage) {
      setIsFetching(false);
      setErrorMessage(response.errorMessage);
    } else {
      deleteExpense(expenseId as string);
      navigation.goBack();
    }
  };

  const submit = async (expenseData: RequestBodyType) => {
    setIsFetching(true);
    if (!isEditing) {
      const id = await request({ body: expenseData });
      if (id?.errorMessage) {
        setIsFetching(false);
        setErrorMessage(id.errorMessage);
      } else {
        createExpense({ ...expenseData, id });
        navigation.goBack();
      }
    } else {
      updateExpense(expenseData, expenseId);
      const body = { ...expenseData, id: expenseId };
      const response = await request({ method: 'put', body });
      if (response?.errorMessage) {
        setIsFetching(false);
        setErrorMessage(response.errorMessage);
      } else navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${isEditing ? 'Edit' : 'Add'} Expense`,
    });
  }, [isEditing, navigation]);

  if (errorMessage && !isFetching) return <ErrorOverlay errorMessage={errorMessage} />;

  return isFetching ? (
    <LoadingOverlay />
  ) : (
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
