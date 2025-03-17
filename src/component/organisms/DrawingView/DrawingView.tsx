import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Button from "../../atoms/Button";
import { ArrowForward, Back, Brush2, BrushBig, Trash } from "iconsax-react";
import ColorPicker from "../../atoms/ColorPicker";
import {
  buttonContainer,
  buttonDivStyle,
  canvasContainer,
  canvasStyle,
  cardLayerStyle,
  colorPickerContainer,
  mainLayoutContainer,
  nextButtonStyle,
  predictionsContainer,
  predictionsTitle,
  randomSelector,
  submitButtonStyle,
} from "./DrawingViewStyle";
import { t } from "i18next";
import { Card, Col, Row, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationOutlined, LoadingOutlined } from "@ant-design/icons";
import { getRandomDrawingObject } from "../../../util";
import { QuickDraw } from "../../../constants";
import { getQuickDrawPrediction } from "../../../services";

const { Title } = Typography;

const DrawingView: React.FC = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [color, setColor] = useState<string>("#FFFFFF");
  const [answer, setAnswer] = useState<string>(QuickDraw.noResult);
  const [objectName, setObjectName] = useState<string>(getRandomDrawingObject());

  const onFinish = async () => {
    try {
      const data = await canvasRef.current?.exportImage("png");
      if (data) {
        setAnswer(QuickDraw.loading);
        const blob = await (await fetch(data)).blob();
        const formData = new FormData();
        formData.append("file", blob, "drawing.png");
        formData.append("selected_object", objectName);
        const response = await getQuickDrawPrediction(formData
        );
        if (response.is_correct) {
          setAnswer(QuickDraw.correct);
        } else {
          setAnswer(QuickDraw.error);
        }
      }
    } catch (error) {
      setAnswer(QuickDraw.noResult);
      console.error("Error exporting image:", error);
    }
  };

  const handleNext = () => {
    canvasRef.current?.resetCanvas();
    setAnswer(QuickDraw.noResult);
    setObjectName(getRandomDrawingObject());
  };

  return (
    <div style={mainLayoutContainer}>
      <Row gutter={16}>
        <Col span={12}>
          <div style={canvasContainer}>
            <ReactSketchCanvas
              ref={canvasRef}
              strokeWidth={20}
              strokeColor={color}
              canvasColor="black"
              style={canvasStyle}
            />
          </div>
        </Col>
        <Col span={12}>
          <Card style={cardLayerStyle}>
            <Title level={1} style={randomSelector}>{t(objectName)}</Title>
            {answer === QuickDraw.correct ? (
              <>
                <CheckCircleOutlined style={predictionsContainer(answer)} />
                <Title level={3} style={predictionsTitle(answer)}>{t('correctDrawing')}</Title>
              </>
            ) : answer === QuickDraw.error ? (
              <>
                <CloseCircleOutlined style={predictionsContainer(answer)} />
                <Title level={3} style={predictionsTitle(answer)}>{t('wrongDrawing')}</Title>
              </>
            ) : answer === QuickDraw.noResult ? (
              <>
                <ExclamationOutlined style={predictionsContainer(answer)} />
                <Title level={3} style={predictionsTitle(answer)}>{t('noResult')}</Title>
              </>
            ) : (
              <>
                <LoadingOutlined style={predictionsContainer(answer)} />
                <Title level={3} style={predictionsTitle(answer)}>{t('loading')}</Title>
              </>
            )}
            <Row style={{ marginTop: 40 }}>
              <Col span={12}>
                <Button type="primary" handleOnClick={onFinish} style={submitButtonStyle} text={t('submit')} />
              </Col>
              <Col span={12}>
                <Button type="primary" style={nextButtonStyle} handleOnClick={handleNext} text={t('nextDrawing')} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row style={buttonDivStyle}>
        <div>
          <Button
            handleOnClick={() => canvasRef.current?.eraseMode(false)}
            style={buttonContainer} text={t("pen")}
            icon={<Brush2 size="32" />}
          />
          <ColorPicker
            defaultValue={color}
            style={colorPickerContainer}
            onChange={(colorObj) => setColor(colorObj.toHexString())}
          />
          <Button
            handleOnClick={() => canvasRef.current?.eraseMode(true)}
            style={buttonContainer} text={t("eraser")}
            icon={<BrushBig size="32" />}
          />
          <Button
            handleOnClick={() => canvasRef.current?.resetCanvas()}
            style={buttonContainer}
            text={t("clear")}
            icon={<Trash size={32} />}
          />
          <Button
            handleOnClick={() => canvasRef.current?.undo()}
            style={buttonContainer} text={t("undo")}
            icon={<Back size="32" />}
          />
          <Button
            handleOnClick={() => canvasRef.current?.redo()}
            style={buttonContainer} text={t("redo")}
            icon={<ArrowForward size="32" />} />
        </div>
      </Row>
    </div>
  );
};

export default DrawingView;