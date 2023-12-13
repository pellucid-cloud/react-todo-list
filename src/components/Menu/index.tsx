import {Menu as AntdMenu} from 'antd'
import {ItemType} from "antd/es/menu/hooks/useItems";
export function Menu(props: {items: ItemType[]}){
  const {items} = props
  return (
    <AntdMenu theme="dark" items={items}></AntdMenu>
  )
}
