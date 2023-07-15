import { useWindowDimensions } from 'react-native';

export default function useGlobalDimensions() {
  const { height } = useWindowDimensions();
  const isLandscape = height < 380;

  return { isLandscape };
}
