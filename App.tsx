import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RecentExpenses, AllExpenses, ManageExpense } from './Screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import AppProvider from './Provider/AppProvider';
import { FunctionComponent } from 'react';

export type StackPages = {
  ExpensesOverview: undefined;
  ManageExpense: { id?: string };
};

export type TabsPages = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const Tabs = createBottomTabNavigator<TabsPages>();
const Stacks = createNativeStackNavigator<StackPages>();

function ExpenseOverview() {
  const navigation = useNavigation<NavigationProp<StackPages>>();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <Ionicons
            name="add"
            color={tintColor}
            size={20}
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate('ManageExpense', {id: undefined})}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpenses as FunctionComponent}
        options={{
          tabBarLabel: 'Recent Expenses',
          title: 'Recent Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpenses as FunctionComponent}
        options={{
          tabBarLabel: 'All Expenses',
          title: 'All Expenses',
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
          <Stacks.Screen
            name="ExpensesOverview"
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
          <Stacks.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ presentation: 'modal' }}
          />
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
