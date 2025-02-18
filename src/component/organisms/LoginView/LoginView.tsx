import React from 'react';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { cardStyle, inputFieldStyle, submitButtonStyle } from './LoginViewStyle';

interface LoginViewProps {
  onFinish: (values: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Card style={cardStyle}>
      
      <Typography.Title
        level={4}
        style={{ textAlign: "center", marginBottom: 20, marginTop: 10 }}
      >
        {t("welcome")}
      </Typography.Title>

      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={24}>
            <Form.Item name="email" rules={[{ required: true, message: t("email_required") }]}>
              <Input style={inputFieldStyle} placeholder={t("email_placeholder")} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="password" rules={[{ required: true, message: t("password_required") }]}>
              <Input style={inputFieldStyle} placeholder={t("password_placeholder")} type="password" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={submitButtonStyle}>
                {t("signin")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default LoginView;
