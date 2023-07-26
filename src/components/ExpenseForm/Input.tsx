import { useGlobalDimensions } from 'hooks';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import theme from 'styles/theme';

interface InputProps extends TextInputProps {
  label: string;
  viewStyle?: ViewProps['style'];
  invalid: boolean;
}

function Input({ label, multiline, viewStyle = {}, invalid, ...props }: InputProps) {
  const { isLandscape } = useGlobalDimensions();

  const inputStyles: TextInputProps['style'] = [styles.input];
  if (multiline) inputStyles.push(styles.inputMultiline);

  if (invalid) inputStyles.push(styles.invalidInput);

  return (
    <View style={[styles.inputContainer, isLandscape && { marginVertical: 4 }, viewStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={[inputStyles, isLandscape && { minHeight: 50 }]} {...props} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: theme().colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: theme().colors.primary100,
    color: theme().colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: theme().colors.erro500,
  },
  invalidInput: {
    backgroundColor: theme().colors.erro50,
  },
});
