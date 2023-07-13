import { StyleSheet, Text, View } from 'react-native';

import { ExpenseType, ExpensesDataModel } from 'models';
import theme from 'styles/theme';

interface ExpensesSummaryProps {
  periodName: ExpensesDataModel['periodName'];
  expenses: ExpenseType[];
}

function ExpensesSummary({ periodName, expenses }: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce((sum: number, expense: ExpenseType) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodName}</Text>
      <Text style={styles.summaryText}>$ {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme().colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodText: {
    fontSize: 12,
    color: theme().colors.primary400,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme().colors.primary500,
  },
});
