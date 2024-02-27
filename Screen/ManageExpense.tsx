import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { StackPages } from '../App';
import { useLayoutEffect, useState } from 'react';
import {
  expenseAdded,
  expenseDeleted,
  expenseUpdated,
  selectExpenses,
} from '../features/expenses/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Provider/store';

type Props = NativeStackScreenProps<StackPages, 'ManageExpense'>;

function ManageExpense({ navigation, route }: Props) {
  const expenses = useSelector(selectExpenses);
  const dispatch = useDispatch<AppDispatch>();

  const [inputs, setInputs] = useState({
    amount: { value: '', isValid: true },
    date: { value: '', isValid: true },
    description: { value: '', isValid: true },
  });
  const { id } = route.params;
  let isEditing = true;
  if (!id) isEditing = false;

  const handleChange = (name: keyof typeof inputs, text: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: { value: text, isValid: true },
    }));
  };

  const handleSubmit = () => {
    const data = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };
    const isValidAmount = !isNaN(data.amount) && data.amount > 0;
    const isValidDate = new Date(data.date).toString() !== 'Invalid Date';
    const isValidDescription = data.description.length > 0;

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      setInputs((prev) => ({
        amount: { value: prev.amount.value, isValid: isValidAmount },
        date: { value: prev.date.value, isValid: isValidDate },
        description: {
          value: prev.description.value,
          isValid: isValidDescription,
        },
      }));
      return;
    }

    if (!id) {
      dispatch(expenseAdded(data));
    } else {
      dispatch(expenseUpdated({ id, data }));
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!id) return;
    dispatch(expenseDeleted(id));
    navigation.goBack();
  };

  useLayoutEffect(() => {
    if (isEditing) {
      const data = expenses.find((exp) => exp.id === id);
      if (!data) return;
      setInputs({
        amount: { value: data.amount.toString(), isValid: true },
        date: { value: data.date.slice(0, 10), isValid: true },
        description: { value: data.description, isValid: true },
      });
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Input
          label="amount"
          textInputProps={{
            keyboardType: 'decimal-pad',
            value: inputs.amount.value,
            onChangeText: (text) => handleChange('amount', text),
          }}
          containerStyle={{ flex: 1 }}
        />
        <Input
          label="date"
          textInputProps={{
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: (text) => handleChange('date', text),
          }}
          containerStyle={{ flex: 1 }}
        />
      </View>
      <Input
        label="description"
        textInputProps={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: (text) => handleChange('description', text),
        }}
        style={{ minHeight: 100, textAlignVertical: 'top' }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
          marginBottom: 10,
          gap: 14,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ flex: 1 }}>
          <Button title={isEditing ? 'Update' : 'Add'} onPress={handleSubmit} />
        </View>
      </View>
      {isEditing && <Button title="Delete" onPress={handleDelete} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textInput: {
    backgroundColor: 'white',
    fontSize: 20,
  },
});

export default ManageExpense;

interface InputProps {
  label: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  textInputProps: TextInputProps;
}

function Input({ label, textInputProps, style, containerStyle }: InputProps) {
  return (
    <View style={[containerStyle]}>
      <Text style={{ marginBottom: 10 }}>{label}</Text>
      <TextInput {...textInputProps} style={[styles.textInput, style]} />
    </View>
  );
}
