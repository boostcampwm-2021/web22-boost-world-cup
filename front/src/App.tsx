import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Reset, theme } from './commons/style';
import * as ROUTE from './commons/constants/route';
import * as PAGE from './pages';
import { PrivateRoute } from './components';
import GlobalStore from './stores';

function App(): JSX.Element {
  return (
    <GlobalStore>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Router>
          <Switch>
            <Route path={ROUTE.ROOT} component={PAGE.Root} exact />
            <Route path={ROUTE.MAIN} component={PAGE.Main} exact />
            <Route path={ROUTE.LOGIN} component={PAGE.Login} />
            <Route path={ROUTE.SIGNUP} component={PAGE.SignUp} />
            <PrivateRoute path={ROUTE.MAKE} component={PAGE.Make} />
            <PrivateRoute path={ROUTE.INITIALIZE} component={PAGE.Initialize} />
            <PrivateRoute path={ROUTE.WORLDCUP} component={PAGE.Game} />
            <PrivateRoute path={ROUTE.MYWORLDCUP} component={PAGE.MyWorldcup} />
            <Route path={ROUTE.RANKING} component={PAGE.Ranking} />
            <PrivateRoute path={ROUTE.MYINFO} component={PAGE.MyInfo} />
            <PrivateRoute path={ROUTE.LEAVE} component={PAGE.Leave} />
            <PrivateRoute path={ROUTE.EDIT} component={PAGE.Edit} />
            <PrivateRoute path={ROUTE.PROFILE} component={PAGE.Profile} />
            <Route component={PAGE.NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </GlobalStore>
  );
}

export default App;
