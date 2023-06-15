import { View } from 'react-native';

import { ExpensesDataModel } from 'models';
import ExpensesSummary from './components/ExpensesSummary';
import ExpensesList from './components/ExpensesList';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2023-02-18'),
  },
];

interface ExpensesContainerProps {
  periodName: ExpensesDataModel['periodName'];
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  expenses?: ExpensesDataModel['expenses']; // REVIEW LATER
}

function ExpensesContainer({ periodName }: ExpensesContainerProps) {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesContainer;
