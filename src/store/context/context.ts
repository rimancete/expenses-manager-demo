/* eslint-disable @typescript-eslint/no-explicit-any */
import constate from 'constate';
import { useState, useCallback } from 'react';

interface ReducerProps {
  initialValues: Record<string, any>;
}

function useReducer({ initialValues }: ReducerProps) {
  const [state, setGlobalState] = useState(initialValues);

  const dispatch = useCallback((newValues: Record<string, any>) => {
    setGlobalState((prevState) => {
      return { ...prevState, ...newValues };
    });
  }, []);

  return { state, dispatch };
}

const [GlobalStateProvider, useGlobalState, useDispatch] = constate(
  useReducer,
  (value) => value.state,
  (value) => value.dispatch,
);

export { GlobalStateProvider, useGlobalState, useDispatch };
