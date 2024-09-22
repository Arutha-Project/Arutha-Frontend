import { Layout } from 'antd';

const AntdFooter = Layout.Footer;

export interface FooterProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const Footer: React.FC<FooterProps> = ({ children, style }) => {
  return <AntdFooter style={style}>{children}</AntdFooter>;
};

export default Footer;
