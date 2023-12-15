import {Menu as AntdMenu} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {MenuItemProps, defaultMenu} from "@/config/menu";
import {getCurrentPath} from "@/utils/window";

export function Menu(props: { items: MenuItemProps[] }) {
  const {items} = props
  const navigate = useNavigate();
  const key = getCurrentPath() || defaultMenu
  const [selectKeys, setSelectKeys] = useState<string[]>([key]);
  const handleSelect = ({key}) => {
    setSelectKeys(key)
    navigate(key)
  };
  return (
    <AntdMenu theme="dark" selectedKeys={selectKeys} items={items} onSelect={handleSelect}></AntdMenu>
  )
}
