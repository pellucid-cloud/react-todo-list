import {BaseLayout} from '@/layout/BaseLayout'
import {lazy} from "react";
import {RouteObject} from "react-router-dom";

// TODO 路由权限控制
export default [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
    ]
  }
] as RouteObject[]
