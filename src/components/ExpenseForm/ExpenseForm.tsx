/* eslint-disable @typescript-eslint/no-empty-function */
import { StyleSheet, Text, View } from 'react-native';

import { useGlobalDimensions } from 'hooks';
import theme from 'styles/theme';

import { useState } from 'react';
import Input from './Input';

const initialValues = {
  amount: '',
  date: '',
  description: '',
};

function ExpenseForm() {
  const { isLandscape } = useGlobalDimensions();
  const [inpuValues, setInputValues] = useState(initialValues);

  const inputChangeHandler = (value: string, inputName: keyof typeof initialValues) => {
    setInputValues((prevState) => {
      return { ...prevState, [inputName]: value };
    });
  };
  return (
    <View style={[styles.form, isLandscape && { marginTop: 0, flex: 1 }]}>
      <Text style={[styles.titleForm, isLandscape && { marginVertical: 0 }]}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(value) => inputChangeHandler(value, 'amount')}
          value={inpuValues.amount}
          viewStyle={styles.rowInput}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(value) => inputChangeHandler(value, 'date')}
          value={inpuValues.date}
          viewStyle={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        multiline
        // autoCorrect={false}
        // autoCapitalize='none'
        onChangeText={(value) => inputChangeHandler(value, 'description')}
        value={inpuValues.description}
      />
    </View>
  );
}

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  titleForm: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme().colors.primaryLight50,
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
});
