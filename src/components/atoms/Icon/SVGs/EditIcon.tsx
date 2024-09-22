import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const EditIcon: React.FC<SVGIconProps> = ({ width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={width / 2} cy={height / 2} r={width / 2} fill="#FFF3E5" />
      <path
        d="M16.9164 9.89084L10.9455 16.2108C10.72 16.4508 10.5018 16.9236 10.4582 17.2508L10.1891 19.6072C10.0945 20.4581 10.7055 21.0399 11.5491 20.8945L13.8909 20.4945C14.2182 20.4363 14.6764 20.1963 14.9018 19.949L20.8727 13.629C21.9055 12.5381 22.3709 11.2945 20.7636 9.77448C19.1636 8.26903 17.9491 8.79994 16.9164 9.89084Z"
        stroke="#FF8900"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9199 10.9453C16.2326 12.9526 17.8617 14.4871 19.8836 14.6908"
        stroke="#FF8900"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.45459 23.2727H22.5455"
        stroke="#FF8900"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
