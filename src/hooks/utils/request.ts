import axios from 'axios';

import { Env } from '@env';
import { RequestBodyType } from 'models';

interface ResquestProps {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: RequestBodyType;
}
export default async function request({ method = 'post', body }: ResquestProps) {
  const { API_URL, APP_ENV } = Env;

  const { id, ...restBody } = body || {};
  const payload = restBody;
  const url = `${API_URL}${id ? `/expenses/${id}` : '/expenses'}.json`;

  return axios[method](url, Object.keys(payload).length ? { ...payload } : undefined)
    .then((response) => {
      const { data } = response;
      if (method === 'get') {
        const expenses: RequestBodyType[] = [];

        Object.keys(data).forEach((key) => {
          const expenseFormatted = {
            id: key,
            amount: data[key].amount,
            date: new Date(data[key].date),
            description: data[key].description,
          };
          expenses.push(expenseFormatted);
        });
        return expenses;
      }
      // eslint-disable-next-line no-console
      if (APP_ENV === 'development') console.log(method, url, response.status);

      if (method === 'put' || method === 'delete') return response;
      return data.name;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      return { errorMessage: err.message, errors: err };
    });
}
