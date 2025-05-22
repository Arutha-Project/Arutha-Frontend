import React from "react";
import {  Card, Layout} from "antd";
import { mainLayoutContainer, card } from "./RegistrationStudentStyle";
import { RegistrationView } from "../../organisms/RegistrationView";
import { MainLayout } from '../../templates';
import { motion } from "framer-motion";
import { t } from "i18next";

const RegistrationStudent: React.FC = () => {

    const onFinish = (values: any) => {
        console.log("Received values:", values);
    };
    
    return (
        <MainLayout>
            <Layout style={mainLayoutContainer}>
                <div>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Card style={card}>
                            <h1 style={{textAlign:"center", color:"white"}}>{t("StudentRegistration")}</h1>
                            <RegistrationView onFinish={onFinish} />
                        </Card>
                    </motion.div>
                </div>
            </Layout>
        </MainLayout>
    );
}

export default RegistrationStudent;
