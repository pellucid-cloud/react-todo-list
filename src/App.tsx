import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import { themeConfig } from "@/theme/theme";
import {useAppSelector} from "@/store/hooks";
import {useCallback, useEffect, useState} from "react";
import routes, {pushList, RouteObject} from "@/router";
import AuthRouter from "@/router/AuthRouter";

function useRouter(){
  const [router, setRouter] = useState(routes);
  const list = useAppSelector(state => state.list.value)
  const handleAuthRouter = useCallback((route: RouteObject) => {
    route.element = route.auth ? <AuthRouter>{route.element}</AuthRouter> : route.element
    return route
  }, [])
  useEffect(() => {
    const newRouter = pushList(router, list).map(item => handleAuthRouter(item))
    setRouter(newRouter)
  }, [list])
  return router
}

function useSetup() {
  const router = useRouter()
  return { router }
}

function App() {
  const { router } = useSetup();
  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp>
        <RouterProvider router={createBrowserRouter(router)}>
        </RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
