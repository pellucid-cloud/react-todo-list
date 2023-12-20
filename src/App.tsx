import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import router from './router'
import { themeConfig } from "@/theme/theme";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

function useSetup() {
  return { router }
}

function App() {
  const { router } = useSetup();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={createBrowserRouter(router)}>
          </RouterProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
