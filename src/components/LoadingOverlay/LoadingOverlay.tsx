import { ActivityIndicator, StyleSheet, View } from 'react-native';
import theme from 'styles/theme';

function LoadingOverlay() {
  return (
    <View style={sytles.container}>
      <ActivityIndicator size="large" color={theme().colors.primaryLight50} />
    </View>
  );
}

export default LoadingOverlay;

const sytles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme().colors.primary700,
  },
});
