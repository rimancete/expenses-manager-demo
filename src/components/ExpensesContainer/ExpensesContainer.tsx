import { StyleSheet, Text, View } from 'react-native';

import { ExpenseType, ExpensesDataModel } from 'models';
import theme from 'styles/theme';
import ExpensesSummary from './components/ExpensesSummary';
import ExpensesList from './components/ExpensesList';

interface ExpensesContainerProps {
  periodName: ExpensesDataModel['periodName'];
  expenses: ExpenseType[];
  fallbackText: string;
}

function ExpensesContainer({ periodName, expenses, fallbackText }: ExpensesContainerProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

export default ExpensesContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: theme().colors.primary700,
  },
  infoText: {
    color: theme().colors.primaryLight100,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
