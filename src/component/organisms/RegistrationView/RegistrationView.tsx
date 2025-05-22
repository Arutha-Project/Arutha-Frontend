import React from 'react';
import { Card, Col, Form, FormInstance, Input, Row, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { inputFieldStyle, submitButtonStyle, card } from './RegistrationViewStyle';
import Button from '../../atoms/Button';
import { motion } from 'framer-motion';

interface RegistrationViewProps {
    onFinish: (values: any) => void;
    isTeacher?: boolean;
    form: FormInstance;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({
    onFinish,
    isTeacher,
    form,
}) => {
    const { t } = useTranslation();

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card style={card}>
                <img src="src/assets/images/arutha.png" style={{ width: "150px", margin: "0px auto", display: "block" }} />
                <Typography.Title
                    level={4} style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}>
                    {t('homePageDescription')}
                </Typography.Title>

                <Form form={form} onFinish={onFinish}>
                    <Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name="firstName" rules={[{ required: true, message: t("firstName_required") }]}>
                                    <Input style={inputFieldStyle} placeholder={t("firstName_placeholder")} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item name="lastName" rules={[{ required: true, message: t("lastName_required") }]}>
                                    <Input style={inputFieldStyle} placeholder={t("lastName_placeholder")} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={24}>
                            <Form.Item name="roleId" rules={[{ required: true, message: t("role_required") }]}>
                                <Select style={inputFieldStyle} placeholder={t("role_placeholder")}>
                                    {isTeacher && <Select.Option value="1" style={{ fontSize: "16px" }}>{t("teacher")}</Select.Option>}
                                    {!isTeacher && <Select.Option value="2" style={{ fontSize: "16px" }}>{t("student")}</Select.Option>}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="email" rules={[{ required: true, type: 'email', message: t("email_required") }]}>
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
                                <Button
                                    type="primary"
                                    text={t("signin")}
                                    style={submitButtonStyle}
                                    handleOnClick={() => form.submit()}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </motion.div>
    );
}

export default RegistrationView;
