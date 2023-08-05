import { useMemo, useState } from 'react';
import { ButtonProps, StyleSheet, Text, View } from 'react-native';

import { useGlobalDimensions } from 'hooks';
import formatDate from 'utils/formatDate';
import { ExpenseType, RequestBodyType } from 'models';
import theme from 'styles/theme';
import Button from '../Button';

import Input from './Input';

const initialValues = {
  amount: { value: '', isValid: true },
  date: { value: '', isValid: true },
  description: { value: '', isValid: true },
};

interface ExpenseFormProps {
  onSubmit: (expenseData: RequestBodyType) => void;
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
  const [inputs, setInputs] = useState({
    ...initialValues,
    ...(defaultValues && {
      amount: { value: defaultValues.amount.toString(), isValid: true },
      date: {
        value: defaultValues.date instanceof Date ? formatDate.get(defaultValues.date) : '',
        isValid: true,
      },
      description: { value: defaultValues.description, isValid: true },
    }),
  });

  const inputChangeHandler = (value: string, inputName: keyof typeof initialValues) => {
    setInputs((prevState) => {
      return { ...prevState, [inputName]: { value, isValid: true } };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !Number.isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: { value: prevState.description.value, isValid: descriptionIsValid },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid = useMemo(
    () => !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid,
    [inputs.amount.isValid, inputs.date.isValid, inputs.description.isValid],
  );

  return (
    <View style={[styles.form, isLandscape && { marginTop: 0, flex: 1 }]}>
      <Text style={[styles.titleForm, isLandscape && { marginVertical: 0 }]}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          keyboardType="decimal-pad"
          onChangeText={(value) => inputChangeHandler(value, 'amount')}
          value={String(inputs.amount.value)}
          viewStyle={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          placeholder="YYYY-MM-DD"
          maxLength={10}
          onChangeText={(value) => inputChangeHandler(value, 'date')}
          value={inputs.date.value}
          viewStyle={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        multiline
        // autoCorrect={false}
        // autoCapitalize='none'
        onChangeText={(value) => inputChangeHandler(value, 'description')}
        value={inputs.description.value}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
      )}

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
  errorText: {
    textAlign: 'center',
    color: theme().colors.erro500,
    margin: 8,
  },
});
