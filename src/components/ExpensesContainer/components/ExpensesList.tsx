import { FlatList, ListRenderItemInfo } from 'react-native';

import { ExpenseType } from 'models';
import { useGlobalState } from 'store/context';
import ExpenseItem from './ExpenseItem';

function ExpensesList() {
  const { expenses } = useGlobalState();

  const keyExtractor = (item: ExpenseType) => item.id;

  const renderItem = (itemData: ListRenderItemInfo<ExpenseType>) => {
    const { item } = itemData;
    return <ExpenseItem expense={item} />;
  };
  return <FlatList data={expenses} renderItem={renderItem} keyExtractor={keyExtractor} />;
}

export default ExpensesList;
