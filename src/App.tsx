import {RouterProvider} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import {ConfigProvider, App as AntdApp} from 'antd';
import {themeConfig} from "@/theme/theme";
import {useAppSelector} from "@/store/hooks";
import {useCallback} from "react";
import routes, {pushList, RouteObject} from "@/router";
import AuthRouter from "@/router/AuthRouter";
import zhCN from 'antd/es/locale/zh_CN';

function useRouter() {
  const list = useAppSelector(state => state.list.value)
  const handleAuthRouter = useCallback((route: RouteObject) => {
    route.element = route.auth ? <AuthRouter>{route.element}</AuthRouter> : route.element
    return route
  }, [])
  return pushList(routes, list).map(item => handleAuthRouter(item))
}

function useSetup() {
  const router = useRouter()
  return {router}
}

function App() {
  const {router} = useSetup();
  return (
    <ConfigProvider theme={themeConfig} locale={zhCN}>
      <AntdApp>
        <RouterProvider router={createBrowserRouter(router)}/>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
