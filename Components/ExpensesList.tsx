import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Expenses } from '../features/expenses/expenseSlice';

interface Props {
  expenses: Expenses;
  onPress: (id:string) => void;
}

const ExpensesList = ({ expenses, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ExpenseItem onPress={onPress} expense={itemData.item} />
        )}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 10,
    gap: 2,
  },
});

const ExpenseItem = ({
  expense,
  onPress,
}: {
  expense: Expenses[0];
  onPress: (id: string) => void;
}) => {
  return (
    <Pressable onPress={() => onPress(expense.id)} style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{expense.description}</Text>
        <Text>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(expense.amount)}
        </Text>
      </View>
      <Text>{expense.date.slice(0, 10)}</Text>
    </Pressable>
  );
};
