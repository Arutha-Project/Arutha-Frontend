import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const VerifyIcon: React.FC<SVGIconProps> = ({ width = 24, height = 24, color = '#292D32' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.38 12L10.79 14.42L15.62 9.58002"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.75 2.45001C11.44 1.86001 12.57 1.86001 13.27 2.45001L14.85 3.81001C15.15 4.07001 15.71 4.28001 16.11 4.28001H17.81C18.87 4.28001 19.74 5.15001 19.74 6.21001V7.91001C19.74 8.30001 19.95 8.87001 20.21 9.17001L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.81C19.74 18.87 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.57C12.58 22.16 11.45 22.16 10.75 21.57L9.17 20.21C8.87 19.95 8.31 19.74 7.91 19.74H6.18C5.12 19.74 4.25 18.87 4.25 17.81V16.1C4.25 15.71 4.04 15.15 3.79 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79 9.17001C4.04 8.87001 4.25 8.31001 4.25 7.92001V6.20001C4.25 5.14001 5.12 4.27001 6.18 4.27001H7.91C8.3 4.27001 8.87 4.06001 9.17 3.80001L10.75 2.45001Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default VerifyIcon;
