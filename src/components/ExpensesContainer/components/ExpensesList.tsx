import { FlatList, ListRenderItemInfo } from 'react-native';

import { ExpenseType } from 'models';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: ExpenseType[];
}

function ExpensesList({ expenses }: ExpensesListProps) {
  const keyExtractor = (item: ExpenseType) => item.id;

  const renderItem = (itemData: ListRenderItemInfo<ExpenseType>) => {
    const { item } = itemData;
    return <ExpenseItem expense={item} />;
  };
  return <FlatList data={expenses} renderItem={renderItem} keyExtractor={keyExtractor} />;
}

export default ExpensesList;
