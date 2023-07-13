const formatDate = {
  expenseItem: (date: Date) => {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  },
  getDateMinusDays: (date: Date, days: number) => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - days);
  },
};

export default formatDate;
