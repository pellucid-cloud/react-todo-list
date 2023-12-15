import {BaseLayout} from '@/layout/BaseLayout'
import {Page404} from '@/views/error/page404';
import {Navigate, RouteObject} from "react-router-dom";
import {lazy} from 'react';

const Today = lazy(() => import('@/views/Home/Today'));
const All = lazy(() => import('@/views/Home/All'));
const Done = lazy(() => import('@/views/Home/Done'));
const Remind = lazy(() => import('@/views/Remind'))
const List = lazy(() => import('@/views/List'))
// TODO: 路由权限控制
export default [
  {
    path: '/',
    element: <BaseLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to={'/today'} replace={true}/>
      },
      {
        path: '/today',
        element: <Today/>
      },
      {
        path: '/all',
        element: <All/>
      },
      {
        path: '/done',
        element: <Done/>
      },
      {
        path: '/remind',
        element: <Remind/>
      },
      {
        path: '/list',
        element: <List/>
      }
    ]
  },
  {
    path: '*',
    element: <Page404/>
  }
] as RouteObject[]
