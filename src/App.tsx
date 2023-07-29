import { StatusBar } from 'expo-status-bar';
import Screens from 'components/Screens';
import { GlobalStateProvider } from 'store/context';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <GlobalStateProvider initialValues={{ expenses: [] }}>
        <Screens />
      </GlobalStateProvider>
    </>
  );
}
