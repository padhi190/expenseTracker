import ExpensesList from '../Components/ExpensesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackPages } from '../App';
import { useSelector } from 'react-redux';
import { selectExpenses } from '../features/expenses/expenseSlice';

interface Props
  extends NativeStackScreenProps<StackPages, 'ExpensesOverview'> {}

function AllExpenses({ navigation }: Props) {
  const expenses = useSelector(selectExpenses);
  const sorted = [...expenses].sort((a, b) => {
    if (b.date > a.date) return 1;
    return -1;
  });
  const onPress = (id: string) => navigation.navigate('ManageExpense', { id });
  return <ExpensesList expenses={sorted} onPress={onPress} />;
}

export default AllExpenses;
