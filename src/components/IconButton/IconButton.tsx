import { OpaqueColorValue, Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string | OpaqueColorValue | undefined;
  size: number;
  onPress: PressableProps['onPress'];
}
function IconButton({ icon, color, size, onPress }: IconButtonProps) {
  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <MaterialIcons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
