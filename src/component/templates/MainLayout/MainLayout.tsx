import React from "react";
import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { SideMenu } from "../../pages";

interface MainLayoutProps {
  children: React.ReactNode;
  spinning?: boolean; 
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, spinning = false }) => {
  return (
    <Layout>
      <Spin spinning={spinning} size="large">
        <Layout style={{ display: "flex" }}>
          <SideMenu />
          <Content style={{ flex: 1 }}>
            {children}
          </Content>
        </Layout>
      </Spin>
    </Layout>
  );
};

export default MainLayout;



