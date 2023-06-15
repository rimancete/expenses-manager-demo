interface ExpenseType {
  amount: number;
  id: string;
  description: string;
  date: Date;
}
type ExpensesDataType = {
  expenses: ExpenseType[];
  periodName: string;
};

export { ExpensesDataType, ExpenseType };
