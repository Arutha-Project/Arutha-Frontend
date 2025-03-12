import React from 'react';
import { Col, Layout, Row, Select } from 'antd';
import { DrawingResultView, DrawingView } from '../../organisms';
import { LanguageContext } from '../../../context/LanguageContext';

const LoginPage: React.FC = () => {
  const { language, changeLanguage } = React.useContext(LanguageContext);

  return (
    <Layout>
      <Select value={language} onChange={changeLanguage} style={{ width: 120, marginBottom: 10 }}>
        <Select.Option value="en">English</Select.Option>
        <Select.Option value="si">සිංහල</Select.Option>
      </Select>
      <div>
        <Row>
          <Col span={12}>
            <DrawingView />
          </Col>
          <Col span={12}>
            <DrawingResultView isCorrect={true} onNext={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default LoginPage;
