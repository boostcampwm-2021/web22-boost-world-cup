import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Reset, theme } from './styles';
import * as ROUTE from './constants/route';
import GlobalStore from './stores';
import Loading from './pages/Loading';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Make = lazy(() => import('./pages/Make'));
const Initialize = lazy(() => import('./pages/Initialize'));
const Game = lazy(() => import('./pages/Game'));
const MyWorldcup = lazy(() => import('./pages/MyWorldcup'));
const Ranking = lazy(() => import('./pages/Ranking'));
const MyInfo = lazy(() => import('./pages/MyInfo'));
const Leave = lazy(() => import('./pages/Leave'));
const Edit = lazy(() => import('./pages/Edit'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App(): JSX.Element {
  return (
    <GlobalStore>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <PublicRoute path={ROUTE.MAIN} component={Main} exact />
              <PublicRoute path={ROUTE.LOGIN} component={Login} />
              <PublicRoute path={ROUTE.SIGNUP} component={SignUp} />
              <PrivateRoute path={ROUTE.MAKE} component={Make} />
              <PrivateRoute path={ROUTE.INITIALIZE} component={Initialize} />
              <PrivateRoute path={ROUTE.WORLDCUP} component={Game} />
              <PrivateRoute path={ROUTE.MYWORLDCUP} component={MyWorldcup} />
              <PublicRoute path={ROUTE.RANKING} component={Ranking} />
              <PrivateRoute path={ROUTE.MYINFO} component={MyInfo} />
              <PrivateRoute path={ROUTE.LEAVE} component={Leave} />
              <PrivateRoute path={ROUTE.EDIT} component={Edit} />
              <PrivateRoute path={ROUTE.PROFILE} component={Profile} />
              <PublicRoute component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </GlobalStore>
  );
}

export default App;
