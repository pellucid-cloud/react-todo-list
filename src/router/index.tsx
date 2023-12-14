import {BaseLayout} from '@/layout/BaseLayout'
import { Page404 } from '@/views/error/page404';
import {lazy} from "react";
import {RouteObject} from "react-router-dom";

// TODO 路由权限控制
export default [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
    ]
  },
  {
    path: '*',
    element: <Page404 />
  }
] as RouteObject[]
