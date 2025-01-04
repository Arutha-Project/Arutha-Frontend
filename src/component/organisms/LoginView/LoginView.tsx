import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { LoginDataIndex, LoginTitle } from '../../../constants/index.ts';
import { cardStyle, inputFieldStyle, submitButtonStyle } from './LoginViewStyle.ts';

interface LoginViewProps {
  onFinish: (values: LoginDataIndex) => void;
};

const LoginView: React.FC<LoginViewProps> = ({
  onFinish,
}) => {

  const [form] = Form.useForm();

  return (
    <Card style={cardStyle}>
      <Typography.Title
        level={4}
        style={{
          textAlign: "center",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Welcome Arutha Educational Platform
      </Typography.Title>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={24}>
            <Form.Item
              name={LoginDataIndex.email}
              rules={[{ required: true, message: "Please enter Email" }]}
            >
              <Input
                style={inputFieldStyle}
                placeholder={LoginTitle[LoginDataIndex.email]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={LoginDataIndex.password}
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input
                placeholder={LoginTitle[LoginDataIndex.password]}
                type="password"
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={submitButtonStyle}>
                Sign in
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default LoginView;
