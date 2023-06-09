import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import ManageExpense, { ManageExpenseParams } from 'screens/ManageExpense';
import RecentExpenses from 'screens/RecentExpenses';
import Expenses from 'screens/Expenses';
import theme from 'styles/theme';
import { IconButton } from 'components';

export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpense: ManageExpenseParams;
};

export type BottomTabsParamList = {
  RecentExpenses: undefined;
  Expenses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: theme().colors.primary500 },
        headerTintColor: theme().colors.primaryLight50,
        tabBarStyle: { backgroundColor: theme().colors.primary500 },
        tabBarInactiveTintColor: theme().colors.primaryLight100,
        tabBarActiveTintColor: theme().colors.secondary500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="hourglass-full" color={color} size={size} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Expenses"
        component={Expenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ExpensesOverview"
        screenOptions={{
          headerStyle: { backgroundColor: theme().colors.primary500 },
          headerTintColor: theme().colors.primaryLight50,
        }}>
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screens;
