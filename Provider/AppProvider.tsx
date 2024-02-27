import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './store';

function AppProvider({ children }: { children: ReactNode }) {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default AppProvider;
