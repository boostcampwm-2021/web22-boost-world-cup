import React, { useState, useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { UserDispatcherContext } from '../../stores/userStore/index';
import Loading from '../../pages/Loading';
import useApiRequest, { REQUEST } from '../../hooks/useApiRequest';
import { getUser } from '../../utils/api/auth';
import { UserInfo } from '../../types/Datas';

interface Props {
  component: (props: any) => JSX.Element;
  exact?: boolean;
  path?: string;
}

function PublicRoute({ component: TargetPage, exact, path }: Props): JSX.Element {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
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
      exact={exact}
      render={(props) => {
        if (!isLoginChecked) return <Loading />;
        return <TargetPage {...props} />;
      }}
    />
  );
}

export default PublicRoute;
