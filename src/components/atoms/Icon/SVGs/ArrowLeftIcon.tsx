import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const ArrowLeftIcon: React.FC<SVGIconProps> = ({ height = 17, width = 17, color = '#1F1F1F' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.31104 14.1099L10.9294 9.49156C11.4748 8.94614 11.4748 8.05364 10.9294 7.50823L6.31104 2.88989"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
