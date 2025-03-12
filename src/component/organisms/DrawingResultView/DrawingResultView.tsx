import { Card, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { mainLayoutContainer } from "./DrawingResultViewStyle";
import { t } from "i18next";
import { Button } from "../../atoms";

const { Title } = Typography;

interface DrawingResultViewProps {
  isCorrect: boolean;
  onNext: () => void;
}

const DrawingResultView: React.FC<DrawingResultViewProps> = ({
  isCorrect,
  onNext
}) => {
  return (
    <div style={mainLayoutContainer}>
      <Card style={{ textAlign: "center", padding: "20px", width: 300 }}>
        {isCorrect ? (
          <>
            <CheckCircleOutlined style={{ fontSize: 50, color: "green" }} />
            <Title level={3} style={{ color: "green" }}>{t('correctDrawing')}</Title>
          </>
        ) : (
          <>
            <CloseCircleOutlined style={{ fontSize: 50, color: "red" }} />
            <Title level={3} style={{ color: "red" }}>{t('wrongDrawing')}</Title>
          </>
        )}
        <Button type="primary" handleOnClick={onNext} style={{ marginTop: 20 }} text={t('nextDrawing')}/>
      </Card>
    </div>
  );
};

export default DrawingResultView;
