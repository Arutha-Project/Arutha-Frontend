import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const MoreIcon: React.FC<SVGIconProps> = ({ height = 17, width = 17, color = '#1F1F1F' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.54167 7.08325C2.7625 7.08325 2.125 7.72075 2.125 8.49992C2.125 9.27909 2.7625 9.91659 3.54167 9.91659C4.32083 9.91659 4.95833 9.27909 4.95833 8.49992C4.95833 7.72075 4.32083 7.08325 3.54167 7.08325Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M13.4582 7.08325C12.679 7.08325 12.0415 7.72075 12.0415 8.49992C12.0415 9.27909 12.679 9.91659 13.4582 9.91659C14.2373 9.91659 14.8748 9.27909 14.8748 8.49992C14.8748 7.72075 14.2373 7.08325 13.4582 7.08325Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8.50016 7.08325C7.721 7.08325 7.0835 7.72075 7.0835 8.49992C7.0835 9.27909 7.721 9.91659 8.50016 9.91659C9.27933 9.91659 9.91683 9.27909 9.91683 8.49992C9.91683 7.72075 9.27933 7.08325 8.50016 7.08325Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default MoreIcon;
