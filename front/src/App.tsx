import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Reset, theme } from './commons/style';
import { ROUTE_MAIN, ROUTE_MAKE, ROUTE_LOGIN } from './commons/constants/route';
import { Main, Make, Login } from './pages';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Reset />
      <Router>
        <Switch>
          <Route path={ROUTE_MAIN} component={Main} exact />
          <Route path={ROUTE_LOGIN} component={Login} />
          <Route path={ROUTE_MAKE} component={Make} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
