import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getThemeColor, Color, Intensity } from '@theme';

import './index.css';

function App() {

  return (
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Google Sans',
                  colorPrimary: getThemeColor(Color.primaryColor, Intensity.Bold),
                },
              }}
            >
            </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
