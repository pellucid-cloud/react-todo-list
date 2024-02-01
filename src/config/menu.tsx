import {MenuProps} from "antd";
import {
  EnvironmentTwoTone,
  DatabaseTwoTone,
  CarryOutTwoTone,
  ExclamationCircleTwoTone,
  TagsTwoTone
} from '@ant-design/icons';

export const defaultMenu = 'today'
export default [
  {
    label: '系统类型',
    type: 'group',
    children: [
      {
        label: '今日',
        key: 'today',
        icon: <EnvironmentTwoTone/>
      },
      {
        label: '所有',
        key: 'all',
        icon: <DatabaseTwoTone/>
      },
      {
        label: '已完成',
        key: 'done',
        icon: <CarryOutTwoTone/>
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '提醒事项',
    key: 'remind',
    icon: <ExclamationCircleTwoTone/>
  },
  {
    type: 'divider'
  },
  {
    label: '我的列表',
    key: 'list',
    icon: <TagsTwoTone/>,
    children: []
  }
] as MenuItemProps[]
export type MenuItemProps = Required<MenuProps>['items'][number] & { key: string, children?: MenuItemProps[] }
