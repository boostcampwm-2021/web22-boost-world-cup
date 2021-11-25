import { useEffect, useContext, useState } from 'react';
import { UserInfo } from '../types/Datas';
import { UserDispatcherContext } from '../stores/userStore';
import useApiRequest, { REQUEST } from './useApiRequest';
import { getUser } from '../utils/api/auth';

const useLoginCheck = (): boolean => {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const userDispatcher = useContext(UserDispatcherContext);

  const onGetUserSuccess = (data: UserInfo) => {
    userDispatcher({ type: 'LOGIN', payload: { ...data, isLoggedIn: true } });
    setIsLoginChecked(true);
  };
  const onGetUserFailure = () => {
    userDispatcher({ type: 'LOGOUT' });
    setIsLoginChecked(true);
  };
  const getUserDispatcher = useApiRequest(getUser, onGetUserSuccess, onGetUserFailure);

  useEffect(() => {
    getUserDispatcher({ type: REQUEST });
  }, []);

  return isLoginChecked;
};

export default useLoginCheck;
