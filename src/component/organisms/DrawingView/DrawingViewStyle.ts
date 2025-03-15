import { QuickDraw } from "../../../constants";

export const mainLayoutContainer: React.CSSProperties = {
};

export const canvasContainer: React.CSSProperties = {
  height: "500px",
  marginLeft: "5px",
  border: "1px solid #ddd"
};

export const canvasStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  border: "1px solid #ddd"
};

export const buttonContainer: React.CSSProperties = {
  margin: "10px",
  height: "40px"
};

export const cardLayerStyle: React.CSSProperties = {
  textAlign: "center",
  paddingLeft: "10px",
  width: "770px",
  height: "500px",
};

export const randomSelector: React.CSSProperties = {
  textAlign: "center",
  marginBottom: 20,
  marginTop: 10
};

export const predictionsContainer = (answer: string): React.CSSProperties => {
  let color;
  switch (answer) {
    case QuickDraw.correct:
      color = "green";
      break;
    case QuickDraw.error:
      color = "red";
      break;
    case QuickDraw.noResult:
      color = "black";
      break;
    default:
      color = "gray";
  }
  return {
    fontSize: 50,
    color,
  };
};

export const predictionsTitle = (answer: string): React.CSSProperties => {
  let color;
  switch (answer) {
    case QuickDraw.correct:
      color = "green";
      break;
    case QuickDraw.error:
      color = "red";
      break;
    case QuickDraw.noResult:
      color = "black";
      break;
    default:
      color = "gray";
  }
  return {
    color,
  };
};

export const nextButtonStyle: React.CSSProperties = {
  margin: "10px",
  width: "50wh",
  height: "40px",
  fontSize: "20px"
}
