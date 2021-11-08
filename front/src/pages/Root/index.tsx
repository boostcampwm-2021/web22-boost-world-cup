import React from 'react';
import { Redirect } from 'react-router-dom';

function Root(): JSX.Element {
  return <Redirect to="/main" />;
}

export default Root;
