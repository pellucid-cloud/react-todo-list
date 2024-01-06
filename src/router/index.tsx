import { BaseLayout } from '@/layout/BaseLayout'
import { Page404 } from '@/views/Error/page404';
import { Navigate, RouteObject } from "react-router-dom";
import { lazy } from 'react';
import { ListItemProps } from '@/store/modules/list';

const Today = lazy(() => import('@/views/Home/Today'));
const All = lazy(() => import('@/views/Home/All'));
const Done = lazy(() => import('@/views/Home/Done'));
const Remind = lazy(() => import('@/views/Remind'))
const List = lazy(() => import('@/views/List'))
const ItemList = lazy(() => import('@/views/List/ItemList'))
// TODO: 路由权限控制
export default [
  {
    path: '/',
    element: <BaseLayout />,
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
        // meta:{
        //   requiresAuth: true
        // }
      },
      {
        path: 'list/:id',
        element: <ItemList />,
      }
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
] as RouteObject[]

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
