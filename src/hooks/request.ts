// import axios from 'axios';

export default function request() {
  const saveExpense = () => {
    const URL = process.env.API_URL;
    console.log('API URL', URL);
    //   axios.post();
  };

  return {
    saveExpense,
  };
}
