import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const DocumentForwardIcon: React.FC<SVGIconProps> = ({ width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#7B61FF" fillOpacity="0.13" />
      <path
        d="M15.2727 19.6364L16.7273 18.1818L15.2727 16.7273L16.7273 18.1818H12.3636"
        stroke="#7B61FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2727 14.5455V18.1818C23.2727 21.8182 21.8182 23.2727 18.1818 23.2727H13.8182C10.1818 23.2727 8.72729 21.8182 8.72729 18.1818V13.8182C8.72729 10.1818 10.1818 8.72729 13.8182 8.72729H17.4546"
        stroke="#7B61FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2726 14.5455H20.3636C18.1817 14.5455 17.4545 13.8182 17.4545 11.6364V8.72729L23.2726 14.5455Z"
        stroke="#7B61FF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentForwardIcon;
