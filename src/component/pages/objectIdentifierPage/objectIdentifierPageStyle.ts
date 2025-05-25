export const mainLayoutContainerOI: React.CSSProperties = {
  display: 'flex',
  backgroundImage: 'url(src/assets/images/Object_Identifier_background_image.jpg)',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const Container1: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '1000px',
  width: '1000px',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
};

export const videoStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px',
  height: '500px',
  borderRadius: '10px',
  border: '2px solid #ddd',
  objectFit: 'cover'
};

export const startButtonDevTagStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '20px'
};

export const startButtonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  fontSize: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: '0.3s',
  width: '200px',
  textAlign: 'center'
};

export const nextButtonStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: '8px',
  background: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  alignItems: 'center',
  marginLeft: '20px'
};

export const leftShowingData: React.CSSProperties = {
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "100px"
};

export const processingGif: React.CSSProperties = {
  marginTop: '15px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'blue'
};

export const stopButtonStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '8px',
  color: 'white',
  border: 'none',
  background: '#dc3545', // Default background color
  cursor: 'pointer',
};

export const stopButtonDisabledStyle: React.CSSProperties = {
  ...stopButtonStyle,  // Inherit base styles
  background: '#ccc',  // Disabled background color
  cursor: 'not-allowed',
};

export const startRecordingButtonStyle: React.CSSProperties = {
  marginRight: '10px',
  padding: '8px 12px',
  borderRadius: '8px',
  color: 'white',
  border: 'none',
  background: '#28a745', // Default active color
  cursor: 'pointer',
};

export const startRecordingButtonDisabledStyle: React.CSSProperties = {
  ...startRecordingButtonStyle,  // Inherit base styles
  background: '#ccc',  // Disabled color
  cursor: 'not-allowed',
};

export const pageHeader: React.CSSProperties = {
  marginBottom: '100px',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  color: '#2c3e50',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
};
