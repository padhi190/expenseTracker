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
import { useAppExpense } from '../Provider/AppProvider';

type Props = NativeStackScreenProps<StackPages, 'ManageExpense'>;

function ManageExpense({ navigation, route }: Props) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useAppExpense();
  const [inputs, setInputs] = useState({
    amount: '',
    date: '',
    description: '',
  });
  const { id } = route.params;
  let isEditing = true;
  if (!id) isEditing = false;

  const handleChange = (name: keyof typeof inputs, text: string) => {
    setInputs((prevInputs) => ({ ...prevInputs, [name]: text }));
  };

  const handleSubmit = () => {
    const data = {
      amount: +inputs.amount,
      date: new Date(inputs.date),
      description: inputs.description
    }
    if (!id) {
      addExpense(data);
    } else {
      updateExpense(id, data);
    }
    navigation.goBack();
  }

  const handleDelete = () => {
    if (!id) return;
    deleteExpense(id);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    if (isEditing) {
      const data = expenses.find((exp) => exp.id === id);
      if (!data) return;
      setInputs({
        amount: data.amount.toString(),
        date: data.date.toISOString().slice(0, 10),
        description: data.description,
      });
    }
  }, [id]);

  return (
    <View style={styles.container}>
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
            value: inputs.amount,
            onChangeText: (text) => handleChange('amount', text),
          }}
          containerStyle={{ flex: 1 }}
        />
        <Input
          label="date"
          textInputProps={{
            maxLength: 10,
            value: inputs.date,
            onChangeText: (text) => handleChange('date', text),
          }}
          containerStyle={{ flex: 1 }}
        />
      </View>
      <Input
        label="description"
        textInputProps={{
          multiline: true,
          value: inputs.description,
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
          <Button title={isEditing ? 'Update' : 'Add'}  onPress={handleSubmit}/>
        </View>
      </View>
      {isEditing && <Button title='Delete' onPress={handleDelete} />}
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
