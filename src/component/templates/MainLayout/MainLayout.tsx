import React from "react";
import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout";

interface MainLayoutProps {
  children: React.ReactNode;
  spinning: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  spinning = false,
}) => {
  return (
    <Layout>
      <Spin spinning={spinning} size="large">
        <Content style={{ minHeight: 800 }}>{children}</Content>
      </Spin>
    </Layout>
  );
};

export default MainLayout;
