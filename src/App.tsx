import { ConfigProvider, ThemeConfig } from "antd";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";
import { LanguageProvider } from "./context/LanguageContext";

import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
const socket = io("http://localhost:5000"); // Connect to Flask backend

function App() {
  const customTheme: ThemeConfig = {
    token: {
      fontFamily: "Poppins, sans-serif",
    },

    components: {
      Typography: {
        fontFamily: "Poppins, sans-serif",
      },
      Input: {
        fontSize: 18,
        lineHeight: 2.3,
      },
    },
  };

  return (
    <Provider store={store}>
      <LanguageProvider>
        <ConfigProvider theme={customTheme}>
          <Router />
        </ConfigProvider>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
