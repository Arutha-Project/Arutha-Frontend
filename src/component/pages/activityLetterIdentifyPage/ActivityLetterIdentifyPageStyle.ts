export const languageSelector: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 700,
};

export const selectorDiv: React.CSSProperties = {
  width: 120,
  marginBottom: 10,
  marginRight: 10
}

export const mainLayoutContainer: React.CSSProperties = {
  backgroundImage: `url("/src/assets/images/english_letters_bg.jpg")`, 
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: '100vh',  
  width: 'flex',   
};

export const contentContainer: React.CSSProperties = {
padding: "20px",
borderRadius: "10px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0)",
textAlign: "center",
maxWidth: "900px",
width: "100%",
backgroundColor: "rgba(255, 255, 255, 0.72)",
};


export const backButton: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
};

// Hover effect using `:hover`
export const backButtonHover: React.CSSProperties = {
  backgroundColor: "#d9d9d9",
  borderColor: "#999",
  transform: "scale(1.05)",
};

export const pageContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "20px",
  gap: "10px", // Adds spacing between columns
};

export const sidePanel: React.CSSProperties = {
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  width: "600px",
  minHeight: "700px",
  backgroundColor: "rgba(255, 255, 255, 0.72)",
};

export const contentInnerContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  minHeight: "550px",
};

export const videoContainer: React.CSSProperties = {
  flex: 3, // Takes up equal space
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const videoStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  // maxHeight: "600px",
  borderRadius: "10px",
};

export const contentRightPanel: React.CSSProperties = {
  flex: 1, // Takes up equal space
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  minHeight: "350px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

export const titleContainer: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  animation: "zoomInOut 10s infinite", // Add the zoom in/out animation
};

export const titleStyle: React.CSSProperties = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#3b0b96", // Custom color for the title
  textShadow: "2px 2px 5px rgba(0,0,0,0.3)", // Adds a playful effect
  fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fun font
  animation: "zoomInOut 10s infinite", // Apply zoom animation here as well
};

// Adding the zoomInOut keyframes in the CSS
const zoomInOut = `
  @keyframes zoomInOut {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const globalStyles: React.CSSProperties = {
  animation: "zoomInOut 10s infinite",
};

const styleElement = document.createElement("style");
styleElement.innerHTML = zoomInOut;

// Append the style element to the head
document.head.appendChild(styleElement);