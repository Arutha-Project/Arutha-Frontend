import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const PrinterIcon: React.FC<SVGIconProps> = ({ height = 25, width = 25, color = '#FFFBFB' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.552 7.29159H17.4478V5.20825C17.4478 3.12492 16.6666 2.08325 14.3228 2.08325H10.677C8.33325 2.08325 7.552 3.12492 7.552 5.20825V7.29159Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 15.625V19.7917C16.6666 21.875 15.6249 22.9167 13.5416 22.9167H11.4583C9.37492 22.9167 8.33325 21.875 8.33325 19.7917V15.625H16.6666Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.875 10.4167V15.6251C21.875 17.7084 20.8333 18.7501 18.75 18.7501H16.6667V15.6251H8.33333V18.7501H6.25C4.16667 18.7501 3.125 17.7084 3.125 15.6251V10.4167C3.125 8.33341 4.16667 7.29175 6.25 7.29175H18.75C20.8333 7.29175 21.875 8.33341 21.875 10.4167Z"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.7084 15.625H16.448H7.29175"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.29175 11.4583H10.4167"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PrinterIcon;
