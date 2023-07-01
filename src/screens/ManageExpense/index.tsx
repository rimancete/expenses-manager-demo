import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton, Button } from 'components';
import theme from 'styles/theme';
import { ManageExpenseNavigationProps } from 'types';

export interface ManageExpenseParams {
  categoryId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const categoryId = route.params;
  const isEdting = !!categoryId;

  const closeModal = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    closeModal();
  };

  const cancelHandler = () => {
    closeModal();
  };

  const confirmHandler = () => {
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
