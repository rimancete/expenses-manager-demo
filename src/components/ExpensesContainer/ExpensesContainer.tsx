import { StyleSheet, View } from 'react-native';

import { ExpensesDataModel } from 'models';
import theme from 'styles/theme';
import ExpensesSummary from './components/ExpensesSummary';
import ExpensesList from './components/ExpensesList';

interface ExpensesContainerProps {
  periodName: ExpensesDataModel['periodName'];
}

function ExpensesContainer({ periodName }: ExpensesContainerProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} />
      <ExpensesList />
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
});
