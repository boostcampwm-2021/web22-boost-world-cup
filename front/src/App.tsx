import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Reset, theme } from './commons/style';
import * as ROUTE from './commons/constants/route';
import * as PAGE from './pages';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Reset />
      <Router>
        <Switch>
          <Route path={ROUTE.ROOT} component={PAGE.Root} exact />
          <Route path={ROUTE.MAIN} component={PAGE.Main} exact />
          <Route path={ROUTE.LOGIN} component={PAGE.Login} />
          <Route path={ROUTE.SIGNUP} component={PAGE.SignUp} />
          <Route path={ROUTE.MAKE} component={PAGE.Make} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
