import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  FontSizeOutlined,
  FieldBinaryOutlined,
  PictureOutlined,
  HighlightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SideMenuContainer, Logo, DateTime } from "./SideMenuStyle";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentDateTime(`${formattedDate}\n${formattedTime}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      style={SideMenuContainer}
    >
      <div style={Logo}></div>
      {!collapsed && <div style={DateTime}>{currentDateTime}</div>}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} // ✅ Keeps menu item active after refresh
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/home" icon={<HomeOutlined />}> {t("homePage")} </Menu.Item>
        <Menu.Item key="/sign-letters" icon={<FontSizeOutlined />}> {t("SignLetters")} </Menu.Item>
        <Menu.Item key="/numbers-Identify-Page" icon={<FieldBinaryOutlined />}> {t("SignNumbers")} </Menu.Item>
        <Menu.Item key="/object-identifier" icon={<PictureOutlined />}> {t("ObjectIdentification")} </Menu.Item>
        <Menu.Item key="/drawing" icon={<HighlightOutlined />}> {t("Drawing")} </Menu.Item>
      </Menu>

      <Menu
        theme="dark"
        mode="inline"
        style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        <Menu.Item key="/login" icon={<LogoutOutlined />} onClick={() => navigate("/login")}>
          {t("logOut")}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
