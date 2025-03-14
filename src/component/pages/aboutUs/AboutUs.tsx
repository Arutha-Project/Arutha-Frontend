import { useTranslation } from 'react-i18next';
import {  contentContainer, mainLayoutContainer } from './AboutUsStyle';

const AboutUs: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div style={mainLayoutContainer}>
        <div style={contentContainer}>
            <h1>{t("aboutUs")}</h1>
            <p>{t("aboutUsContent")}</p>
            <p>{t("aboutUsContent2")}</p><br/>
            <p><b>{t("aboutUsContent3")}</b></p>
        </div>
        </div>
    );
};

export default AboutUs;