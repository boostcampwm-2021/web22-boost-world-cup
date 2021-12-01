import React, { useContext } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { UserStateContext } from '../../stores/userStore/index';
import Loading from '../../pages/Loading';
import { LOGIN } from '../../constants/route';
import { useLoginCheck } from '../../hooks';

interface Props {
  component: any;
  path?: string;
}

function PrivateRoute({ component: TargetPage, path }: Props): JSX.Element {
  const location = useLocation();
  const isLoginChecked = useLoginCheck();
  const { isLoggedIn } = useContext(UserStateContext);

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isLoginChecked) return <Loading />;
        if (!isLoggedIn)
          return (
            <Redirect
              to={{
                pathname: LOGIN,
                state: { from: location.pathname },
              }}
            />
          );
        return <TargetPage {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
