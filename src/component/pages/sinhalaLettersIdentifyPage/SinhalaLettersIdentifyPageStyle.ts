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
  backgroundImage: `url("/src/assets/images/background_4.jpg")`, 
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
// margin: "20px auto",
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
  padding: "20px",
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
  maxHeight: "600px",
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
