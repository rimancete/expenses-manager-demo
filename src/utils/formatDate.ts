const formatDate = {
  expenseItem: (date: Date) => {
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  },
};

export default formatDate;
