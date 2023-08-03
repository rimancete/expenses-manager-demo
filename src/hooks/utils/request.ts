/* eslint-disable no-restricted-syntax */
import axios from 'axios';

import { Env } from '@env';

interface ResquestProps {
  // endpoint: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: unknown;
  // contentType?: string;
  // accept?: string | undefined;
  // headers?: HeadersInit | null;
}
export default async function request({ method = 'post', body }: ResquestProps) {
  // const isFormData = body instanceof FormData;

  const { API_URL, APP_ENV } = Env;
  const url = `${API_URL}/expenses.json`;

  return (
    axios[method](url, body ? { ...body } : undefined)
      .then((response) => {
        const { data } = response;
        if (method === 'get') {
          const expenses = [];

          for (const key in data) {
            if (Object.hasOwn(data, key)) {
              const expenseFormatted = {
                id: key,
                amount: data[key].amount,
                date: new Date(data[key].date),
                description: data[key].description,
              };
              expenses.push(expenseFormatted);
            }
          }
          return expenses;
        }
        // eslint-disable-next-line no-console
        if (APP_ENV === 'development') console.log(method, url, response.status);

        return data.name;
        // return response;
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  );
  // return axios[method](url, {
  //   body: body ? (isFormData ? { ...body } : JSON.stringify({ ...body })) : null,
  // }).then((response) => {
  //   // eslint-disable-next-line no-console
  //   if (NODE_ENV === 'development') console.log(method, url, response.status);
  //   return response;
  // });
}
