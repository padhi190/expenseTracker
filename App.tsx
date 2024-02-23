import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Tab1, Tab2, Welcome } from './Screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export type StackPages = {
  Welcome: undefined;
  Tabs: undefined;
};

export type TabsPages = {
  Tab1: undefined;
  Tab2: undefined;
};

const Stack = createNativeStackNavigator<StackPages>();
const Tabs = createBottomTabNavigator<TabsPages>();

function TabsPage() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Tab1"
        component={Tab1}
        options={{
          tabBarLabel: 'Tab 1',
          tabBarIcon: ({ color, size }) => <Ionicons name='person-outline' color={color} size={size}/>,
        }}
      />
      <Tabs.Screen name="Tab2" component={Tab2} options={{
          tabBarLabel: 'Tab 2',
          tabBarIcon: ({ color, size }) => <Ionicons name='airplane-outline' color={color} size={size}/>,
        }} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Tabs" component={TabsPage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
