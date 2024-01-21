import { BaseLayout } from '@/layout/BaseLayout'
import { Page404 } from '@/views/Error/page404';
import { Navigate } from "react-router-dom";
import {lazy, ReactNode} from 'react';
import { ListItemProps } from '@/store/modules/list';
import Login from "@/views/Login";

const Today = lazy(() => import('@/views/Home/Today'));
const All = lazy(() => import('@/views/Home/All'));
const Done = lazy(() => import('@/views/Home/Done'));
const Remind = lazy(() => import('@/views/Remind'))
const List = lazy(() => import('@/views/List'))
const ItemList = lazy(() => import('@/views/List/ItemList'))
export default [
  {
    path: '/',
    element: <BaseLayout />,
    auth: true,
    children: [
      {
        path: '/',
        element: <Navigate to={'/today'} replace={true} />
      },
      {
        path: 'today',
        element: <Today />
      },
      {
        path: 'all',
        element: <All />
      },
      {
        path: 'done',
        element: <Done />
      },
      {
        path: 'remind',
        element: <Remind />
      },
      {
        path: 'list/all',
        element: <List />,
      },
      {
        path: 'list/:id',
        element: <ItemList />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Page404 />
  }
] as RouteObject[]
export type RouteObject = {
  path: string,
  element: ReactNode,
  auth: boolean,
  children: RouteObject[]
}
export function pushList(router: RouteObject[], list: ListItemProps[]): RouteObject[] {
  const listRoute = router[0].children?.find(route => route.path === '/list')
  if (!listRoute) return router;
  listRoute.children = list.map(item => {
    return {
      path: `/list/${item.id}`,
      element: <>{item.id}</>
    }
  })
  return router
}

