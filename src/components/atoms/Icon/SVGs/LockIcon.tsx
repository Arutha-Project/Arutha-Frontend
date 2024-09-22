import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const LockIcon: React.FC<SVGIconProps> = ({ height = 17, width = 17, color = '#1F1F1F' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 11v-1c0-1.66.5-3 3-3s3 1.34 3 3v1M12 14.6a.6.6 0 1 0 0-1.2.6.6 0 0 0 0 1.2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LockIcon;
