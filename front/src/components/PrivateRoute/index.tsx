import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserStateContext, UserDispatcherContext } from '../../stores/userStore/index';
import Loading from '../../pages/Loading';
import { LOGIN } from '../../commons/constants/route';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { getUser } from '../../utils/api/auth';
import { UserInfo } from '../../types/Datas';

interface Props {
  component: (props: any) => JSX.Element;
  path?: string;
}

function PrivateRoute({ component: TargetPage, path }: Props): JSX.Element {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const { isLoggedIn } = useContext(UserStateContext);
  const userDispatcher = useContext(UserDispatcherContext);

  const onGetUserSuccess = ({ data: userInfo }: { data: UserInfo }) => {
    userDispatcher({ type: 'LOGIN', payload: { ...userInfo, isLoggedIn: true } });
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

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isLoginChecked) return <Loading />;
        if (!isLoggedIn) return <Redirect to={LOGIN} />;
        return <TargetPage {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
