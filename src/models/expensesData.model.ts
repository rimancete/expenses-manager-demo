interface ExpenseType {
  amount: number;
  id: string;
  description: string;
  date: Date;
}
type ExpensesDataType = {
  periodName: string;
};

export { ExpensesDataType, ExpenseType };
