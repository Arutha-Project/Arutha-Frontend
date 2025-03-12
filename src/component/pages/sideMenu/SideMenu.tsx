import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  FontSizeOutlined,
  FieldBinaryOutlined ,
  PictureOutlined,
  HighlightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SideMenuContainer, Logo, DateTime } from "./SideMenuStyle";

const { Sider } = Layout;

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

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
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/home" icon={<HomeOutlined />}> Home </Menu.Item>
        <Menu.Item key="/sign-letters" icon={<FontSizeOutlined />}> Sign Letters </Menu.Item>
        <Menu.Item key="/numbers-Identify-Page" icon={<FieldBinaryOutlined />}> Sign Numbers </Menu.Item>
        <Menu.Item key="/object-identifier" icon={<PictureOutlined />}> Object Identification </Menu.Item>
        <Menu.Item key="/drawing" icon={<HighlightOutlined />}> Drawing </Menu.Item>
      </Menu>


      <Menu
        theme="dark"
        mode="inline"
        style={{ marginTop: "auto", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
      >
        <Menu.Item key="/login" icon={<LogoutOutlined />} onClick={() => navigate("/login")}>
          Log Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
