import React, { useEffect, useReducer } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

export const NULL = 'NULL';
export const REQUEST = 'REQUEST';
export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

interface RequestState<T> {
  type: 'NULL' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  requestProps?: any[];
  response?: T;
  statusCode?: number;
}

type RequestReducer<T> = (state: RequestState<T>, action: RequestState<T>) => RequestState<T>;

const requestReducer = <T>(state: RequestState<T>, action: RequestState<T>) => action;

const fetchData = async <T>(
  apiRequest: (...args: any) => Promise<AxiosResponse<T>>,
  requestDispatcher: React.Dispatch<RequestState<T>>,
  requestProps?: any[],
) => {
  try {
    const { data: response } = requestProps ? await apiRequest(...requestProps) : await apiRequest();
    requestDispatcher({ type: SUCCESS, response });
  } catch (error) {
    const err = error as AxiosError;
    console.error(err.response?.data.error);
    requestDispatcher({ type: FAILURE, statusCode: err.response?.status });
  }
};

const useApiRequest = <T>(
  apiRequest: (...args: any) => Promise<AxiosResponse<T>>,
  onSuccess?: (data: T) => void,
  onFailure?: (status: number) => void,
): React.Dispatch<RequestState<T>> => {
  const [requestState, requestDispatcher] = useReducer<RequestReducer<T>>(requestReducer, { type: NULL });

  useEffect(() => {
    switch (requestState.type) {
      case NULL:
        return;
      case REQUEST: {
        const { requestProps } = requestState;
        fetchData(apiRequest, requestDispatcher, requestProps);
        return;
      }
      case SUCCESS: {
        const { response } = requestState;
        if (onSuccess) onSuccess(response as T);
        requestDispatcher({ type: NULL });
        return;
      }
      case FAILURE: {
        const { statusCode } = requestState;
        if (onFailure && statusCode) onFailure(statusCode);
        requestDispatcher({ type: NULL });
        return;
      }
      default:
        throw new Error('Unexpected request typee');
    }
  }, [requestState]);

  return requestDispatcher;
};

export default useApiRequest;
