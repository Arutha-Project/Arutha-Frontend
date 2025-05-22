import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Button from "../../atoms/Button";
import { ArrowForward, Back, Brush2, BrushBig, Trash } from "iconsax-react";
import {
  buttonContainer,
  buttonDivStyle,
  canvasContainer,
  canvasStyle,
  cardLayerStyle,
  mainLayoutContainer,
  modalContainerStyle,
  nextButtonStyle,
  predictionsContainer,
  predictionsTitle,
  randomSelector,
  submitButtonStyle,
} from "./DrawingViewStyle";
import { t } from "i18next";
import { Card, Col, Modal, Row, Typography } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationOutlined, LoadingOutlined } from "@ant-design/icons";
import { getRandomDrawingObject } from "../../../util";
import { QuickDraw } from "../../../constants";
import { getQuickDrawPrediction } from "../../../services";
import axios from "../../../services/axiosInstance";

const { Title } = Typography;

const DrawingView: React.FC = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [color, setColor] = useState<string>("#FFFFFF");
  const [attemptCount, setAttemptCount] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [answer, setAnswer] = useState<string>(QuickDraw.noResult);
  const [objectName, setObjectName] = useState<string>(getRandomDrawingObject());
  const [isModalVisible, setIsModalVisible] = useState(false);

    const totalRounds = 10;

  const onFinish = async () => {
    if (isFinished) return;

    try {
      const data = await canvasRef.current?.exportImage("png");
      if (data) {
        setAnswer(QuickDraw.loading);
        const blob = await (await fetch(data)).blob();
        const formData = new FormData();
        formData.append("file", blob, "drawing.png");
        formData.append("selected_object", objectName);
        const response = await getQuickDrawPrediction(formData);

        const isCorrect = response.is_correct;
        setResults(prev => [...prev, isCorrect]);
        setAnswer(isCorrect ? QuickDraw.correct : QuickDraw.error);
        if (isCorrect) setScore(prev => prev + 1);

        const nextAttempt = attemptCount + 1;
        setAttemptCount(nextAttempt);

        if (nextAttempt >= totalRounds) {
          setIsFinished(true);
          setIsModalVisible(true);
          saveResultToBackend(score + (isCorrect ? 1 : 0), totalRounds);
        }
      }
    } catch (error) {
      console.error("Error exporting image:", error);
      setAnswer(QuickDraw.noResult);
    }
  };

  const saveResultToBackend = async (finalScore: number, total: number) => {
    try {
      const payload = {
        score: finalScore,
        total,
      };
      await axios.post("/api/save-score", payload);
    } catch (error) {
      console.error("Failed to save score:", error);
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
              strokeWidth={30}
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
            {attemptCount > 0 && !isFinished && (
              <div style={{ marginTop: 16 }}>
                <Title level={4}>
                  You got {score} out of {attemptCount} correct.
                </Title>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title={<Title level={2}>Game Over 🎉 </Title>}
        open={isModalVisible}
        style={modalContainerStyle}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="restart"
            type="primary"
            text="Play Again"
            style={buttonContainer}
            handleOnClick={() => {
              setAttemptCount(0);
              setScore(0);
              setResults([]);
              setIsFinished(false);
              setIsModalVisible(false);
              setAnswer(QuickDraw.noResult);
              setObjectName(getRandomDrawingObject());
              canvasRef.current?.resetCanvas();
            }}
          />
        ]}
      >
        <Title level={3}>You got {score} out of {totalRounds} correct.</Title>
      </Modal>

      <Row style={buttonDivStyle}>
        <div>
          <Button
            handleOnClick={() => canvasRef.current?.eraseMode(false)}
            style={buttonContainer} text={t("pen")}
            icon={<Brush2 size="32" />}
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