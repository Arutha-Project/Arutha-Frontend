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
  borderRadius: '38px',
  height: '44px',
  maxHeight: '44px',
  minWidth: '126px',
  marginTop: '10px',
  marginBottom: '10px',
  marginLeft: '105px',
  background: '#007bff',
  color: "white",
};

export const colorPickerContainer: React.CSSProperties = {
  borderRadius: '38px',
  height: '44px',
  maxHeight: '44px',
  minWidth: '126px',
  marginTop: '10px',
  marginBottom: '20px',
  marginLeft: '105px',
  background: '#007bff',
  color: "white",
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
    fontSize: 70,
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
  borderRadius: '38px',
  height: '44px',
  maxHeight: '44px',
  minWidth: '126px',
  marginTop: '10px',
  marginLeft: '105px',
  background: '#ed7409',
  color: "white",
}

export const submitButtonStyle: React.CSSProperties = {
  borderRadius: '38px',
  height: '44px',
  maxHeight: '44px',
  minWidth: '126px',
  marginTop: '10px',
  marginLeft: '105px',
  background: '#32a852',
  color: "white",
}

export const buttonDivStyle: React.CSSProperties = {
  marginTop: 20, 
  display: "flex", 
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.72)" 
}

export const modalContainerStyle: React.CSSProperties = {
    minWidth: '40%',
    maxWidth: '40%',
};
