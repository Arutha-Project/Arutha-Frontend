import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const DeleteIcon: React.FC<SVGIconProps> = ({ width = 32, height = 32, color = '#F64C4C' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#FFEBEE" />
      <path
        d="M22.5454 11.6217C20.1236 11.3817 17.6872 11.2581 15.2581 11.2581C13.8181 11.2581 12.3781 11.3308 10.9381 11.4762L9.45447 11.6217"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.4545 10.8873L13.6145 9.93457C13.7308 9.24366 13.8181 8.72729 15.0472 8.72729H16.9527C18.1817 8.72729 18.2763 9.27275 18.3854 9.94184L18.5454 10.8873"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9818 13.9199L20.5091 21.2436C20.4291 22.3854 20.3636 23.2726 18.3346 23.2726H13.6655C11.6364 23.2726 11.5709 22.3854 11.4909 21.2436L11.0182 13.9199"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7854 19.2727H17.2072"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1818 16.3635H17.8181"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
