import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatDate } from 'utils';
import { ExpenseType } from 'models';
import theme from 'styles/theme';
import { useNavigation } from '@react-navigation/native';
import { ManageExpenseScreenNavigationHookProps } from 'types';

interface ExpenseItemProps {
  expense: ExpenseType;
}

function ExpenseItem({ expense }: ExpenseItemProps) {
  const { description, date, amount, id } = expense;

  const navigation = useNavigation<ManageExpenseScreenNavigationHookProps>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const expenseItemPressHandler = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={expenseItemPressHandler}>
      <View style={styles.itemContainer}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>{description}</Text>
          <Text style={styles.textBase}>{formatDate.expenseItem(date as Date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amountText]}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  itemContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: theme().colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    ...theme().iosShadowItem,
  },
  textBase: {
    color: theme().colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: theme().colors.primary50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amountText: {
    color: theme().colors.primary500,
    fontWeight: 'bold',
  },
});
