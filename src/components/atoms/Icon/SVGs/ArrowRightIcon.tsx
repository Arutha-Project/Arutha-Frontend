import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const ArrowRightIcon: React.FC<SVGIconProps> = ({ height = 17, width = 17, color = '#1F1F1F' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 -3 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.689 2.89011L6.07063 7.50844C5.52521 8.05386 5.52521 8.94636 6.07063 9.49177L10.689 14.1101"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
