import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RecentExpenses, AllExpenses, ManageExpense } from './Screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './Provider/AppProvider';

export type StackPages = {
  ExpensesOverview: undefined;
  ManageExpense: undefined;
};

export type TabsPages = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const Tabs = createBottomTabNavigator<TabsPages>();
const Stacks = createNativeStackNavigator<StackPages>();

function ExpenseOverview() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          tabBarLabel: 'Recent Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stacks.Navigator>
          <Stacks.Screen name="ExpensesOverview" component={ExpenseOverview} />
          <Stacks.Screen name="ManageExpense" component={ManageExpense} />
        </Stacks.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
