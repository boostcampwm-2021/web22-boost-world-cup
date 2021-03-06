import { useEffect, useContext, useState } from 'react';
import { UserInfo } from '../types/Datas';
import { UserDispatcherContext } from '../stores/userStore';
import useApiRequest from './useApiRequest';
import { getUser } from '../apis/auth';

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
    getUserDispatcher({ type: 'REQUEST' });
  }, []);

  return isLoginChecked;
};

export default useLoginCheck;
