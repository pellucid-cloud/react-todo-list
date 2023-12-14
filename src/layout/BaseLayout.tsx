import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Breadcrumb } from '@/components/Breadcrumb'
import { Header } from '@/layout/Header'
import { Menu } from "@/layout/Menu";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { getMenuList } from '@/config';

const { Content, Sider } = Layout;

export const BaseLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuList = getMenuList()
  console.log(menuList);
  
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Wrapper>
      <Layout className="main-container">
        <Header />
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu items={menuList} />
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Breadcrumb />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100%;

  .main-container {
    min-height: 100vh;
  }
`
