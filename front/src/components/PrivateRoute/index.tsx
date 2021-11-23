import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserStateContext } from '../../stores/userStore/index';
import Loading from '../../pages/Loading';
import { LOGIN } from '../../commons/constants/route';
import { useLoginCheck } from '../../hooks';

interface Props {
  component: (props: any) => JSX.Element;
  path?: string;
}

function PrivateRoute({ component: TargetPage, path }: Props): JSX.Element {
  const isLoginChecked = useLoginCheck();
  const { isLoggedIn } = useContext(UserStateContext);

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
