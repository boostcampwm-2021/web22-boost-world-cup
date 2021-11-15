import React, { useReducer, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

interface RequestState<T> {
  type: 'NULL' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  requestProps?: any[];
  data?: T;
  status?: number;
}

export const NULL = 'NULL';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

type RequestReducer<T> = (action: RequestState<T>, state: RequestState<T>) => RequestState<T>;

const requestReducer = <T>(state: RequestState<T>, action: RequestState<T>): RequestState<T> => {
  const { type } = action;
  switch (type) {
    case 'NULL': {
      return { type };
    }
    case 'REQUEST': {
      const { requestProps } = action;
      return { type, requestProps };
    }
    case 'SUCCESS': {
      const { data } = action;
      return { type, data };
    }
    case 'FAILURE': {
      const { status } = action;
      return { type, status };
    }
    default: {
      throw new Error('Unexpected action type');
    }
  }
};

const fetchData = async <T>(
  apiRequest: (...args: any) => Promise<AxiosResponse<T>>,
  dispatcher: React.Dispatch<RequestState<T>>,
  requestProps?: any[],
) => {
  try {
    const { data } = requestProps ? await apiRequest(...requestProps) : await apiRequest();
    dispatcher({ type: 'SUCCESS', data });
  } catch (error) {
    const err = error as AxiosError;
    dispatcher({ type: 'FAILURE', status: err.response?.status });
  }
};

const useApiRequest = <T>(
  apiRequest: (...args: any) => Promise<AxiosResponse<T>>,
): [RequestState<T>, React.Dispatch<RequestState<T>>] => {
  const initialState: RequestState<T> = { type: 'NULL' };
  const [requestState, requestDispatcher] = useReducer<RequestReducer<T>>(requestReducer, initialState);
  useEffect(() => {
    if (requestState.type !== 'REQUEST') return;
    fetchData(apiRequest, requestDispatcher, requestState.requestProps);
  }, [requestState]);
  return [requestState, requestDispatcher];
};

export default useApiRequest;
