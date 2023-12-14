import {Menu as AntdMenu, MenuProps} from 'antd'
import {ItemType} from "antd/es/menu/hooks/useItems";
import { useNavigate } from 'react-router-dom';
export function Menu(props: {items: ItemType[]}){
  const {items} = props
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };
  return (
    <AntdMenu theme="dark" items={items} onClick={onClick}></AntdMenu>
  )
}
