import React from "react";
import {  Card, Layout} from "antd";
import { mainLayoutContainer, card } from "./RegistrationTeacherStyle";
import { RegistrationView } from "../../organisms/RegistrationView";
import { motion } from "framer-motion";
import { t } from "i18next";

const RegistrationTeacher: React.FC = () => {

    const onFinish = (values: any) => {
        console.log("Received values:", values);
    };
    
    return (
        <Layout style={mainLayoutContainer}>
            <div>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <Card style={card}>
                        <h1 style={{textAlign:"center", color:"white"}}>{t("TeacherRegistration")}</h1>
                        <RegistrationView onFinish={onFinish} />
                    </Card>
                </motion.div>
            </div>
        </Layout>
    );
}

export default RegistrationTeacher;
