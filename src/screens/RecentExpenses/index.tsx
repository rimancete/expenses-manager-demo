import { useCallback, useEffect, useState } from 'react';

import { ErrorOverlay, ExpensesContainer, LoadingOverlay } from 'components';
import { useGlobalState } from 'hooks';
import { request } from 'hooks/utils';
import formatDate from 'utils/formatDate';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { expenses, setExpenses } = useGlobalState();

  const getData = useCallback(async () => {
    const expensesFetched = await request({ method: 'get' });
    if (Array.isArray(expensesFetched)) setExpenses(expensesFetched);
    else setErrorMessage(expensesFetched?.errorMessage);
    setIsFetching(false);
  }, [setExpenses]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorMessage && !isFetching) return <ErrorOverlay errorMessage={errorMessage} />;

  if (isFetching) return <LoadingOverlay />;

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
