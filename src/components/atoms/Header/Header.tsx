import { Layout } from 'antd';

const AntdHeader = Layout.Header;

export interface HeaderProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ children, style }) => {
  return <AntdHeader style={style}>{children}</AntdHeader>;
};

export default Header;
