import { StyleSheet, Text, View } from 'react-native';
import theme from 'styles/theme';

interface ErrorOverlayProps {
  errorMessage: string;
}
function ErrorOverlay({ errorMessage }: ErrorOverlayProps) {
  return (
    <View style={sytles.container}>
      <Text style={[sytles.text, sytles.title]}>An error ocurred</Text>
      <Text style={sytles.text}>{errorMessage}</Text>
    </View>
  );
}

export default ErrorOverlay;

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme().colors.primary700,
  },
  text: {
    color: theme().colors.primaryLight50,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
