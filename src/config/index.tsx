import { useAppSelector } from "@/store/hooks";
import menuList, { MenuItemProps } from "./menu";
import {AppstoreTwoTone} from '@ant-design/icons'
import Point from '@/components/Point'
export function getMenuList() {
  const setMenuItemKey = (item: MenuItemProps, generatorKey: Function) => {
    if (item.key) {
      return item
    }
    if (item?.children) {
      item.children = item.children.map((menu, index) => menu && setMenuItemKey(menu, () => `${generatorKey()}${index}`))
    }
    return {
      ...item,
      key: generatorKey()
    }
  }
  const menus = menuList.map((item, index) => {
    return setMenuItemKey(item, () => `${index}`)
  })
  const list = useAppSelector(state => state.list.value);
  menus[menus.length - 1].children = [
    {
      key: 'list/all',
      label: '全部',
      icon: <AppstoreTwoTone className="point" />
    },
    ...list.map(item => {
      const icon = item.icon ? <img src={item.icon} /> : <Point color={item.bgColor}/>
      return {
        key: `list/${item.id}`,
        label: item.name,
        icon
      }
    })
  ]

  return menus
}