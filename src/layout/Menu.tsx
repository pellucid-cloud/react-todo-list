import { Menu as AntdMenu } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { MenuItemProps, defaultMenu } from "@/config/menu";
import { getCurrentPath } from '@/utils/window';
import styled from 'styled-components';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useDispatch } from 'react-redux';
import { setOpenKeys as setOpenKeysAction } from '@/store/modules/public'

export function Menu(props: { items: MenuItemProps[] }) {
  const { items } = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = getCurrentPath() || defaultMenu
  const keys = key.split('\/')
  const [selectKeys, setSelectKeys] = useState<string[]>([key]);
  const [openKeys, setOpenKeys] = useState<string[]>(keys.length > 1 ? [keys[0]] : []);
  const handleSelect = (event: SelectInfo) => {
    setSelectKeys(event.selectedKeys)
    navigate(event.key)
  };
  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
    // 对展开状态持久化，解决数据变化时重绘导致丢失，提升用户体验
    dispatch(setOpenKeysAction(openKeys))
  }
  return (
    <Wrapper>
      <AntdMenu theme="dark" selectedKeys={selectKeys} openKeys={openKeys} mode='inline' items={items} onSelect={handleSelect} onOpenChange={handleOpenChange} />
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
