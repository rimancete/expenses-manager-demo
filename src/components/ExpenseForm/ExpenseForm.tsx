import { useState } from 'react';
import { Alert, ButtonProps, StyleSheet, Text, View } from 'react-native';

import { useGlobalDimensions } from 'hooks';
import formatDate from 'utils/formatDate';
import { ExpenseType } from 'models';
import theme from 'styles/theme';
import Button from '../Button';

import Input from './Input';

const initialValues = {
  amount: '',
  date: '',
  description: '',
};

interface ExpenseFormProps {
  onSubmit: (expenseData: ExpenseType) => void;
  onCancel: ButtonProps['onPress'];
  submitButtonLabel: string;
  defaultValues?: ExpenseType;
}

function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues = undefined,
}: ExpenseFormProps) {
  const { isLandscape } = useGlobalDimensions();
  const [inputValues, setInputValues] = useState({
    ...initialValues,
    ...(defaultValues && {
      amount: defaultValues.amount.toString(),
      date: defaultValues.date instanceof Date ? formatDate.get(defaultValues.date) : '',
      description: defaultValues.description,
    }),
  });

  const inputChangeHandler = (value: string, inputName: keyof typeof initialValues) => {
    setInputValues((prevState) => {
      return { ...prevState, [inputName]: value };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    const amaountIsValid = !Number.isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amaountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }
    onSubmit(expenseData);
  };

  return (
    <View style={[styles.form, isLandscape && { marginTop: 0, flex: 1 }]}>
      <Text style={[styles.titleForm, isLandscape && { marginVertical: 0 }]}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          keyboardType="decimal-pad"
          onChangeText={(value) => inputChangeHandler(value, 'amount')}
          value={String(inputValues.amount)}
          viewStyle={styles.rowInput}
        />
        <Input
          label="Date"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(value) => inputChangeHandler(value, 'date')}
          value={inputValues.date}
          viewStyle={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        multiline
        // autoCorrect={false}
        // autoCapitalize='none'
        onChangeText={(value) => inputChangeHandler(value, 'description')}
        value={inputValues.description}
      />

      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
        <Button style={styles.button} flat onPress={onCancel}>
          Cancel
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '45%',
  },
});
