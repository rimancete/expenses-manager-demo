import { ExpensesContainer } from 'components';
import { useGlobalState } from 'hooks';
import formatDate from 'utils/formatDate';

function RecentExpenses() {
  const { expenses } = useGlobalState();

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = formatDate.getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesContainer
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
