export const mainLayoutContainer: React.CSSProperties = {
  minHeight: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  backgroundImage: `url("/src/assets/images/letters_bg.jpg")`,
  flexDirection: "column",
  // justifyContent: "center",  // Center content vertically
};

export const cardContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "40px",
  flexWrap: "wrap",  // Allow the cards to wrap on smaller screens
  // marginTop: "20px",
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

// Media Queries for Responsiveness
export const responsiveStyles = {
  // Small screens (mobile devices)
  "@media (max-width: 768px)": {
    cardContainer: {
      flexDirection: "column",  // Stack cards vertically
      gap: "20px",
    },
    englishCard: {
      width: "80%",
      height: "300px",  // Smaller card size for mobile
    },
    sinhalaCard: {
      width: "80%",
      height: "300px",
    },
    activitiesCard: {
      width: "80%",
      height: "300px",
    },
    cardText: {
      fontSize: "16px",  // Smaller text size for mobile
    },
    cardImage: {
      width: "150px",  // Smaller image for mobile
      height: "180px",
    },
    titleContainer: {
      fontSize: "30px",  // Smaller title size for mobile
    },
  },

  // Medium screens (tablets)
  "@media (max-width: 1024px)": {
    cardContainer: {
      flexDirection: "row",  // Cards in a row but wrap if needed
      gap: "30px",
    },
    englishCard: {
      width: "45%",
      height: "320px",  // Adjust card size for tablets
    },
    sinhalaCard: {
      width: "45%",
      height: "320px",
    },
    activitiesCard: {
      width: "45%",
      height: "320px",
    },
    cardText: {
      fontSize: "18px",  // Adjust text size for tablets
    },
    cardImage: {
      width: "180px",  // Adjust image size for tablets
      height: "220px",
    },
    titleContainer: {
      fontSize: "36px",  // Medium size title for tablets
    },
  },

  // Large screens (desktop)
  "@media (min-width: 1025px)": {
    cardContainer: {
      flexDirection: "row",
      gap: "40px",  // Adjust gap between cards for desktop
    },
    englishCard: {
      width: "300px",
      height: "350px",  // Default desktop size for card
    },
    sinhalaCard: {
      width: "300px",
      height: "350px",
    },
    activitiesCard: {
      width: "300px",
      height: "350px",
    },
    cardText: {
      fontSize: "20px",  // Default text size for desktop
    },
    cardImage: {
      width: "200px",  // Default image size for desktop
      height: "250px",
    },
    titleContainer: {
      fontSize: "45px",  // Default title size for desktop
    },
  },
};


export const languageSelector: React.CSSProperties = {
  display: "flex",
  justifyContent: "right",
  alignItems: "center",

};

export const selectorDiv: React.CSSProperties = {
  width: 120,
  marginBottom: 10,
  marginTop: 20,
  marginRight: 20
}

