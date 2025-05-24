import React from "react";
import { Card, Form, Layout, notification, Spin } from "antd";
import { mainLayoutContainer, card } from "./RegistrationTeacherStyle";
import { RegistrationView } from "../../organisms/RegistrationView";
import { motion } from "framer-motion";
import { t } from "i18next";
import { commonNotificationBody, NotificationType, NotificationTypeIndex } from "../../../util";
import { validateUserAndRegister } from "../../../services";

const RegistrationTeacher: React.FC = () => {

    const Context = React.createContext({ name: 'Default' });
    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = React.useState(false);
    const [form] = Form.useForm();

    const openNotification = (type: NotificationType, message: string, notice: string) => {
        commonNotificationBody(api, type, message, <Context.Consumer>{() => notice}</Context.Consumer>);
    };

    const onFinish = async (values: any) => {
        try {
            setIsLoading(true);
            await validateUserAndRegister(values);
            openNotification(NotificationTypeIndex.SUCCESS, t('Registration Successful'), t('You have successfully registered.'));
            form.resetFields();
        } catch (error: any) {
            if (error.response) {
                const { status } = error.response;
                if (status === 401) {
                    openNotification(NotificationTypeIndex.ERROR, t('Registration Failed'), t('Invalid username or password'));
                } else if (status === 500) {
                    openNotification(NotificationTypeIndex.ERROR, t('System Error'), t('Please contact system administrator.'));
                } else {
                    openNotification(NotificationTypeIndex.ERROR, t('Validation Error'), t('Invalid input provided.'));
                }
            } else if (error.request) {
                openNotification(NotificationTypeIndex.ERROR, t('Network Error'), t('No response received from the server.'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout style={mainLayoutContainer}>
            <Spin spinning={isLoading} />
            {contextHolder}
            <div>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Card style={card}>
                        <h1 style={{ textAlign: "center", color: "white" }}>{t("TeacherRegistration")}</h1>
                        <RegistrationView onFinish={onFinish} isTeacher={true} form={form} />
                    </Card>
                </motion.div>
            </div>
        </Layout>
    );
}

export default RegistrationTeacher;
