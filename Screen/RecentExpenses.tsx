import { Text } from 'react-native'
import { useAppExpense } from '../Provider/AppProvider'
import ExpensesList from '../Components/ExpensesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackPages } from '../App';

function Tab1({navigation}: NativeStackScreenProps<StackPages, 'ExpensesOverview'>) {
  const { expenses } = useAppExpense();
  const onPress = (id: string) => navigation.navigate('ManageExpense', {id})
  return (
    <ExpensesList expenses={expenses} onPress={onPress} />
  )
}

export default Tab1 