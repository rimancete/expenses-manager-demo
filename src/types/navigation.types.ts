import { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'components/Screens/Screens';

export type ManageExpenseNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ManageExpense'
>;

export type ManageExpenseScreenNavigationHookProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootStackParamList, 'ManageExpense'>,
  NativeStackNavigationProp<RootStackParamList>
>;
