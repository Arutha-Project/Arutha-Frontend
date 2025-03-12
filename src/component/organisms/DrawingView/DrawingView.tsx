import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Button from "../../atoms/Button";
import { ArrowForward, Back, Brush2, BrushBig, Trash } from "iconsax-react";
import ColorPicker from "../../atoms/ColorPicker";
import { buttonContainer, canvasContainer, canvasStyle, mainLayoutContainer } from "./DrawingViewStyle";
import { t } from "i18next";

const DrawingView = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const [imageData, setImageData] = useState<string>("");
  const [color, setColor] = useState<string>("#FFFFFF"); // Default to black

  const getImage = async () => {
    try {
      const data = await canvasRef.current?.exportImage("png");
      if (data) {
        setImageData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div style={mainLayoutContainer}>
      <div style={canvasContainer}>
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={20}
          strokeColor={color}
          canvasColor="black"
          style={canvasStyle}
        />
      </div>
      <div>
      <Button
        handleOnClick={() => canvasRef.current?.eraseMode(false)}
        style={buttonContainer}
        text={t("pen")}
        icon={<Brush2 size="32" />}
      />
      <ColorPicker
        defaultValue={color}
        style={buttonContainer}
        onChange={(colorObj) => setColor(colorObj.toHexString())}
      />
      <Button
        handleOnClick={() => canvasRef.current?.eraseMode(true)}
        style={buttonContainer}
        text={t("eraser")}
        icon={<BrushBig size="32" />}
      />
      <Button
        handleOnClick={() => canvasRef.current?.resetCanvas()}
        style={buttonContainer}
        text={t("clear")}
        icon={<Trash size={32} />} />
      <Button
        handleOnClick={() => canvasRef.current?.redo()}
        style={buttonContainer}
        text={t("redo")}
        icon={<Back size="32" />} />
      <Button
        handleOnClick={() => canvasRef.current?.undo()}
        style={buttonContainer}
        text={t("undo")}
        icon={<ArrowForward
          size="32"
        />}
      />
        <Button handleOnClick={getImage} text="Get Image"/>
      </div>


      {imageData.trim() !== "" && <img src={imageData} alt="Drawing" />}
    </div>
  );
};

export default DrawingView;
