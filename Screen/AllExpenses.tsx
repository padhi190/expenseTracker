import { Text } from 'react-native'
import { useAppExpense } from '../Provider/AppProvider'
import ExpensesList from '../Components/ExpensesList';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackPages } from '../App';

interface Props extends NativeStackScreenProps<StackPages, 'ExpensesOverview'>{

}

function Tab2({ navigation }: Props) {
  const  { expenses } = useAppExpense();
  const onPress = (id: string) => navigation.navigate('ManageExpense', {id})
  return (
    <ExpensesList expenses={expenses} onPress={onPress}/>
  )
}

export default Tab2 