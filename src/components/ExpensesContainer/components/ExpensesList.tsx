import { FlatList, ListRenderItemInfo, Text } from 'react-native';

import { ExpenseType, ExpensesDataModel } from 'models';

interface ExpensesListProps {
  expenses: ExpensesDataModel['expenses'];
}

function ExpensesList({ expenses }: ExpensesListProps) {
  const keyExtractor = (item: ExpenseType) => item.id;

  const renderItem = (itemData: ListRenderItemInfo<ExpenseType>) => {
    const { item } = itemData;
    return <Text>{item.description}</Text>;
  };
  return <FlatList data={expenses} renderItem={renderItem} keyExtractor={keyExtractor} />;
}

export default ExpensesList;
