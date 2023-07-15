import { ExpensesContainer } from 'components';
import { useGlobalState } from 'hooks';

function Expenses() {
  const { expenses } = useGlobalState();

  return (
    <ExpensesContainer
      expenses={expenses}
      periodName="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default Expenses;
