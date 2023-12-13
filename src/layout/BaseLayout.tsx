import React, {useState} from 'react';
import {UserOutlined, PieChartOutlined, DesktopOutlined, TeamOutlined, FileOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, theme} from 'antd';
import {Breadcrumb} from '@/components/Breadcrumb'
import {Header} from '@/layout/Header'
import {Menu} from "@/components/Menu";
import styled from "styled-components";
import {Outlet} from "react-router-dom";

const {Content, Sider} = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined/>),
  getItem('Option 2', '2', <DesktopOutlined/>),
  getItem('User', 'sub1', <UserOutlined/>, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined/>, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8')
  ]),
  getItem('Files', '9', <FileOutlined/>),
];

export const BaseLayout: React.FC = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Wrapper>
      <Layout className="main-container">
        <Header />
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical"/>
            <Menu items={items}/>
          </Sider>
          <Layout style={{padding: '24px'}}>
            <Breadcrumb/>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet/>
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
