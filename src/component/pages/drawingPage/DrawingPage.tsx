import React from 'react';
import { DrawingView } from '../../organisms';
import { MainLayout } from '../../templates';
import { Layout} from 'antd';
import { mainLayoutContainer } from './DrawingPageStyle';

const DrawingPage: React.FC = () => {

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <div>
          <DrawingView />
        </div>
      </Layout>
    </MainLayout>
  );
};

export default DrawingPage;
