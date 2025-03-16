export const mainLayoutContainer: React.CSSProperties = {
  backgroundImage: `url("/src/assets/images/activity_bg.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  padding: "20px",
};

export const contentContainer: React.CSSProperties = {
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  maxWidth: "100%",
  minHeight: "750px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
};

export const activitySection: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  gap: "20px",
};

export const leftSideEnglish: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  textAlign: "left",
  backgroundColor: "#dff0d8",
  borderRadius: "10px",
  backgroundImage: `url("/src/assets/images/activity_left.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "300px", // Set a fixed height
  minHeight: "750px", // Ensures it doesn't shrink too much

};

export const leftSideSinhala: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  textAlign: "left",
  borderRadius: "10px",
  backgroundImage: `url("/src/assets/images/activity_left.jpg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "300px",
  minHeight: "750px",

};

export const rightSideEnglish: React.CSSProperties = {
  flex: 2,
  padding: "20px",
  textAlign: "left",
  backgroundColor: "#0e1e5db5",
  borderRadius: "10px",
  height: "300px", // Set a fixed height
  minHeight: "700px", // Ensures it doesn't shrink too much
};

export const rightSideSinhala: React.CSSProperties = {
  flex: 2,
  padding: "20px",
  textAlign: "left",
  backgroundColor: "#125a13ad",
  borderRadius: "10px",
  height: "300px", // Set a fixed height
  minHeight: "700px", // Ensures it doesn't shrink too much
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

export const backButtonHover: React.CSSProperties = {
  backgroundColor: "#d9d9d9",
  borderColor: "#999",
  transform: "scale(1.05)",
};
