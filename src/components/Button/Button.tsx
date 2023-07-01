import { Pressable, PressableProps, StyleSheet, Text, View, ViewProps } from 'react-native';
import theme from 'styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onPress: PressableProps['onPress'];
  flat?: boolean;
  style?: ViewProps['style'];
}

function Button({ children, onPress, flat = false, style = {} }: ButtonProps) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, flat && styles.flat]}>
          <Text style={[styles.buttonText, flat && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: theme().colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: theme().colors.primaryLight100,
    textAlign: 'center',
  },
  flatText: {
    color: theme().colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: theme().colors.primary100,
    borderRadius: 4,
  },
});
