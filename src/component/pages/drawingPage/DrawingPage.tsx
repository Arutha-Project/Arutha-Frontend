import React from 'react';
import {  Select } from 'antd';
import { DrawingView } from '../../organisms';
import { LanguageContext } from '../../../context/LanguageContext';
import { MainLayout } from '../../templates';

const DrawingPage: React.FC = () => {
  const { language, changeLanguage } = React.useContext(LanguageContext);

  return (
    <MainLayout>
      <Select
        value={language}
        onChange={changeLanguage}
        style={{ width: 120, marginBottom: 10 }}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="si">සිංහල</Select.Option>
      </Select>
      <div>
        <DrawingView/>
      </div>
    </MainLayout>
  );
};

export default DrawingPage;
