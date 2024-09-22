import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const PrintIcon: React.FC<SVGIconProps> = ({ width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#E5F5EC" />
      <path
        d="M12.5454 12.3637H19.4545V10.9091C19.4545 9.45457 18.909 8.72729 17.2727 8.72729H14.7272C13.0909 8.72729 12.5454 9.45457 12.5454 10.9091V12.3637Z"
        stroke="#47B881"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9091 18.1819V21.091C18.9091 22.5455 18.1819 23.2728 16.7273 23.2728H15.2728C13.8182 23.2728 13.0909 22.5455 13.0909 21.091V18.1819H18.9091Z"
        stroke="#47B881"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5454 14.5453V18.1817C22.5454 19.6363 21.8181 20.3635 20.3636 20.3635H18.909V18.1817H13.0908V20.3635H11.6363C10.1817 20.3635 9.45447 19.6363 9.45447 18.1817V14.5453C9.45447 13.0908 10.1817 12.3635 11.6363 12.3635H20.3636C21.8181 12.3635 22.5454 13.0908 22.5454 14.5453Z"
        stroke="#47B881"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.6364 18.1819H18.7564H12.3636"
        stroke="#47B881"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3636 15.2727H14.5455"
        stroke="#47B881"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PrintIcon;
