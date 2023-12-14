import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import {ConfigProvider} from 'antd';
import router from './router'
import {themeConfig} from "@/theme/theme";

function useSetup(){
  return {router}
}

function App() {
  const {router} = useSetup();

  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={createBrowserRouter(router)}>
      </RouterProvider>
    </ConfigProvider>
  )
}

export default App
