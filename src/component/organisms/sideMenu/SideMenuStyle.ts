export const SideMenuContainer: React.CSSProperties = {
  height: "auto",
  backgroundColor: "#1E1E2E",
  transition: "width 0.3s ease",
};

export const Logo = (isCollapsed: boolean): React.CSSProperties => ({
  width: isCollapsed ? "60px" : "120px",
  height: isCollapsed ? "60px" : "120px",
  backgroundImage: `url("src/assets/images/arutha.png")`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  margin: "20px auto",
});


export const DateTime: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
  whiteSpace: "pre-line",
};

export const LogoutContainer: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  marginBottom: 100,
};

export const LanguageContainer: React.CSSProperties = {
  width: 120, 
  marginBottom: 10,
  marginLeft: 20,
};

export const MenuContainerStyle: React.CSSProperties = {
  marginTop: "auto", 
  borderTop: "1px solid rgba(255, 255, 255, 0.1)" 
};

export const user: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
  whiteSpace: "pre-line",
};