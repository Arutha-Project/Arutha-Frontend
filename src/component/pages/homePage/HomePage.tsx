import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import { Select } from 'antd';
import { languageSelector, selectorDiv } from './HomePageStyle';
import { MainLayout } from '../../templates';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <MainLayout>
    <div>
      <div style={languageSelector}>
        <Select value={language} onChange={changeLanguage} style={selectorDiv}>
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="si">සිංහල</Select.Option>
        </Select>
      </div>
      <h1>{t("homePageWelcome")}</h1>
      <p>{t("homePageDescription")}</p>
    </div>
    </MainLayout>
  );
};

export default HomePage;
