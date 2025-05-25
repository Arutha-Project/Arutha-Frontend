import { useTranslation } from 'react-i18next';
import { contentContainer, mainLayoutContainer } from './AboutUsStyle';
import { MainLayout } from '../../templates';

const AboutUs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <div style={mainLayoutContainer}>
                <div style={contentContainer}>
                    <h1>{t("aboutUs")}</h1>
                    <p>{t("aboutUsContent")}</p>
                    <p>{t("aboutUsContent2")}</p><br />
                    <p><b>{t("aboutUsContent3")}</b></p>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutUs;
