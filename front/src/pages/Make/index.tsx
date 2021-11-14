import React from 'react';
import Store from './store';
import View from './view';

function Make(): JSX.Element {
  return (
    <Store>
      <View />
    </Store>
  );
}

export default Make;
