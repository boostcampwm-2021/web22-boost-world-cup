import React from 'react';
import { Route } from 'react-router-dom';
import Loading from '../../pages/Loading';
import { useLoginCheck } from '../../hooks';

interface Props {
  component: (props: any) => JSX.Element;
  exact?: boolean;
  path?: string;
}

function PublicRoute({ component: TargetPage, exact, path }: Props): JSX.Element {
  const isLoginChecked = useLoginCheck();

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
