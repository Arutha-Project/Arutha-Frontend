import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const PendingIcon: React.FC<SVGIconProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9Z"
        stroke="#FF8900"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7825 11.3851L9.45753 9.99757C9.05253 9.75757 8.72253 9.18007 8.72253 8.70757V5.63257"
        stroke="#FF8900"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PendingIcon;