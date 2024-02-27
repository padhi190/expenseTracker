import ExpensesList from '../Components/ExpensesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackPages } from '../App';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../features/expenses/expenseSlice';

function RecentExpenses({navigation}: NativeStackScreenProps<StackPages, 'ExpensesOverview'>) {
  const expenses = useSelector(selectExpenses);
  const sorted = [...expenses].sort((a, b) => {
    if (b.date > a.date) return 1;
    return -1;
  });
  const onPress = (id: string) => navigation.navigate('ManageExpense', {id})
  return (
    <ExpensesList expenses={sorted.slice(0,5)} onPress={onPress} />
  )
}

export default RecentExpenses 