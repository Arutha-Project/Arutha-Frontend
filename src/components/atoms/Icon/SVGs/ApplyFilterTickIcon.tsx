import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const ApplyFilterTickIcon: React.FC<SVGIconProps> = ({
  height = 24,
  width = 24,
  color = '#FFFFFF',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6299 14.75C21.6299 15.64 21.3899 16.48 20.9499 17.2C20.1299 18.57 18.6199 19.5 16.8799 19.5C15.9399 19.5 15.0599 19.22 14.3199 18.73C13.6999 18.35 13.1899 17.82 12.8199 17.2C12.3799 16.48 12.1299 15.64 12.1299 14.75C12.1299 12.13 14.2599 10 16.8799 10C17.2399 10 17.5899 10.04 17.9199 10.12C20.0499 10.59 21.6299 12.49 21.6299 14.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0303 14.7501L16.2003 15.9201L18.7302 13.5801"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.6901 4.01999V6.23999C20.6901 7.04999 20.1801 8.06001 19.6801 8.57001L17.92 10.12C17.59 10.04 17.2401 10 16.8801 10C14.2601 10 12.1301 12.13 12.1301 14.75C12.1301 15.64 12.3801 16.48 12.8201 17.2C13.1901 17.82 13.7001 18.35 14.3201 18.73V19.07C14.3201 19.68 13.92 20.49 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.46006 13.01 8.06006 12.51L4.22003 8.47C3.72003 7.96 3.31006 7.05001 3.31006 6.45001V4.12C3.31006 2.91 4.22008 2 5.33008 2H18.67C19.78 2 20.6901 2.90999 20.6901 4.01999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ApplyFilterTickIcon;