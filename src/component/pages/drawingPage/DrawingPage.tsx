import React from 'react';
import { DrawingView } from '../../organisms';
import { MainLayout } from '../../templates';
import { Layout, Select } from 'antd';
import { LanguageContext } from '../../../context/LanguageContext';
import { mainLayoutContainer } from './DrawingPageStyle';

const DrawingPage: React.FC = () => {
  const { language, changeLanguage } = React.useContext(LanguageContext);

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <Select
          value={language}
          onChange={changeLanguage}
          style={{ width: 120, marginBottom: 10, marginLeft: 10 }}>
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="si">සිංහල</Select.Option>
        </Select>
        <div>
          <DrawingView />
        </div>
      </Layout>
    </MainLayout>
  );
};

export default DrawingPage;
