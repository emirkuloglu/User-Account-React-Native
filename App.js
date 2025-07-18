import React from 'react'
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import './global'


const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  )
};

export default App;