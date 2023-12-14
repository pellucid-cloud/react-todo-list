import menuList, { MenuItemProps } from "./menu";
export function getMenuList() {
  const setMenuItemKey = (item: MenuItemProps, generatorKey: Function) => {
    if(item.key) {
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
  return menuList.map((item, index) => {
    return setMenuItemKey(item, () => `${index}`)
  })
}