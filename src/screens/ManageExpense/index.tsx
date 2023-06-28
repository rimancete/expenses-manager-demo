import { useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { ManageExpenseNavigationProps } from 'types';

export interface ManageExpenseParams {
  categoryId?: string;
}

function ManageExpense({ navigation, route }: ManageExpenseNavigationProps) {
  const categoryId = route.params;
  const isEdting = !!categoryId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${isEdting ? 'Edit' : 'Add'} Expense`,
    });
  }, [isEdting, navigation]);

  return <Text>{`${isEdting ? 'Edit' : 'Add'} Expense`}</Text>;
}

export default ManageExpense;
