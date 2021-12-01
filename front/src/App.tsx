import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Reset, theme } from './styles';
import * as ROUTE from './constants/route';
import GlobalStore from './stores';
import Loading from './pages/Loading';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const getLazyLoadComponent = (name: string) => lazy(() => import(`./pages/${name}`));

function App(): JSX.Element {
  return (
    <GlobalStore>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <PublicRoute path={ROUTE.MAIN} component={getLazyLoadComponent('Main')} exact />
              <PublicRoute path="/search" component={getLazyLoadComponent('Main')} />
              <PublicRoute path={ROUTE.LOGIN} component={getLazyLoadComponent('Login')} />
              <PublicRoute path={ROUTE.SIGNUP} component={getLazyLoadComponent('SignUp')} />
              <PrivateRoute path={ROUTE.MAKE} component={getLazyLoadComponent('Make')} />
              <PrivateRoute path={ROUTE.INITIALIZE} component={getLazyLoadComponent('Initialize')} />
              <PrivateRoute path={ROUTE.WORLDCUP} component={getLazyLoadComponent('Game')} />
              <PrivateRoute path={ROUTE.MYWORLDCUP} component={getLazyLoadComponent('MyWorldcup')} />
              <PublicRoute path={ROUTE.RANKING} component={getLazyLoadComponent('Ranking')} />
              <PrivateRoute path={ROUTE.MYINFO} component={getLazyLoadComponent('MyInfo')} />
              <PrivateRoute path={ROUTE.LEAVE} component={getLazyLoadComponent('Leave')} />
              <PrivateRoute path={ROUTE.EDIT} component={getLazyLoadComponent('Edit')} />
              <PrivateRoute path={ROUTE.PROFILE} component={getLazyLoadComponent('Profile')} />
              <PublicRoute component={getLazyLoadComponent('NotFound')} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </GlobalStore>
  );
}

export default App;
