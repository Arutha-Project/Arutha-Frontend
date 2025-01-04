import { ConfigProvider, ThemeConfig } from "antd";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";

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
      <ConfigProvider theme={customTheme}>
        <Router />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
