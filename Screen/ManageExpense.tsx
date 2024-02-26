import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'
import { StackPages } from '../App';

type Props = NativeStackScreenProps<StackPages, 'ManageExpense'>;

function Welcome({ navigation }: Props) {
  return (
    <View>
        <Text>Welcome</Text>
        <Button title='Tabs' onPress={() => navigation.navigate('ExpensesOverview')}/>
    </View>
  )
}

export default Welcome