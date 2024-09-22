import { Image as AntdImage } from 'antd';

export interface ImageProps {
  src: string;
  alt: string;
  placeholder: React.ReactNode;
  preview: boolean;
}

const Image: React.FC<ImageProps> = ({ src, alt, placeholder, preview }) => {
  return <AntdImage src={src} alt={alt} placeholder={placeholder} preview={preview} />;
};

export default Image;
