import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import route, {pushList} from './router'
import { themeConfig } from "@/theme/theme";
import { useEffect, useState } from 'react';
import { useAppSelector } from './store/hooks';

function useSetup() {
  const [router, setRouter] = useState(route)
  const list = useAppSelector(state => state.list.value)
  useEffect(() => {
    const newRouter = pushList(router, list)
    setRouter(newRouter)
  }, [list])
  return { router }
}

function App() {
  const { router } = useSetup();

  return (
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={createBrowserRouter(router)}>
      </RouterProvider>
    </ConfigProvider>
  )
}

export default App
