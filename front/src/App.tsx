import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Make from './pages/Make';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/login" component={Login} />
        <Route path="/make" component={Make} />
      </Switch>
    </Router>
  );
}

export default App;
