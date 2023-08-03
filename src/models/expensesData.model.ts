interface ExpenseType {
  name: string;
  amount: number;
  id?: string;
  description: string;
  date: Date | string;
}
type ExpensesDataType = {
  periodName: string;
};

export { ExpensesDataType, ExpenseType };
