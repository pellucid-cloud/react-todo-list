import {Menu as AntdMenu} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {MenuItemProps, defaultMenu} from "@/config/menu";
import {getCurrentPath} from '@/utils/window';
import styled from 'styled-components';

export function Menu(props: { items: MenuItemProps[] }) {
  const {items} = props
  const navigate = useNavigate();
  const key = getCurrentPath() || defaultMenu
  const [selectKeys, setSelectKeys] = useState<string[]>([key]);
  const handleSelect = (event: object) => {
    setSelectKeys(event.key)
    navigate(event.key)
  };
  return (
    <Wrapper>
      <AntdMenu theme="dark" selectedKeys={selectKeys} mode='inline' items={items} onSelect={handleSelect}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .point,
  img {
    position: absolute;
    transform: translateX(calc(-100%));
  }
`
