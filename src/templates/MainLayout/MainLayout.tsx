import { Layout } from 'antd';
import React from 'react';
import { mainContainer, pageContentContainer } from './MainLayoutStyle';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}) => {
  return (
    <Layout style={mainContainer}>
      <Layout style={pageContentContainer}>
        <React.Fragment>{children}</React.Fragment>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
