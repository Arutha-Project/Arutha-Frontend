export const mainLayoutContainer: React.CSSProperties = {
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: 'url(src/assets/images/function_page.jpg)',
};

export const cardContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px", 
};

export const overlayContainer: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "15px", 
  zIndex: 1,
};

const baseCardStyle: React.CSSProperties = {
  width: "300px",
  height: "350px",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  padding: "10px",
  position: "relative",
  transition: "transform 0.2s ease-in-out",
};

export const englishCard: React.CSSProperties = {
  ...baseCardStyle,
  background: "linear-gradient(135deg, #4A90E2, #00BFFF)",
};

export const sinhalaCard: React.CSSProperties = {
  ...baseCardStyle,
  background: "linear-gradient(135deg, #34C759, #00A86B)",
};

export const activitiesCard: React.CSSProperties = {
  ...baseCardStyle,
  background: "linear-gradient(135deg, #FF9500, #FF3B30)", 
};

export const cardText: React.CSSProperties = {
  color: "#fff",
  fontSize: "20px",
  marginTop: "10px",
  fontWeight: "bold",
};

export const cardImage: React.CSSProperties = {
  width: "200px",
  height: "250px",
};
