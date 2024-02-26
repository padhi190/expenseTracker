import { Text } from 'react-native'
import { useAppExpense } from '../Provider/AppProvider'

function Tab2() {
  const  { expenses } = useAppExpense();
  return (
    <Text>{JSON.stringify(expenses)}</Text>
  )
}

export default Tab2 