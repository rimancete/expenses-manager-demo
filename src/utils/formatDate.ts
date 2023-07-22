const formatDate = {
  get: (date: Date) => {
    return date.toISOString().slice(0, 10);
  },
  getDateMinusDays: (date: Date, days: number) => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - days);
  },
};

export default formatDate;
