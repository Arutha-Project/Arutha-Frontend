import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const MicIcon: React.FC<SVGIconProps> = ({
    height = 16,
    width = 16,
    color = '#FF8900',
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
                d="M8 12.6663C10.2067 12.6663 12 10.873 12 8.66634V5.33301C12 3.12634 10.2067 1.33301 8 1.33301C5.79333 1.33301 4 3.12634 4 5.33301V8.66634C4 10.873 5.79333 12.6663 8 12.6663Z"
                stroke={color}
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <path
                d="M2 7.33301V8.66634C2 11.9797 4.68667 14.6663 8 14.6663C11.3133 14.6663 14 11.9797 14 8.66634V7.33301"
                stroke={color}
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <path
                d="M6.07324 4.98711C7.25991 4.55378 8.55324 4.55378 9.73991 4.98711"
                stroke={color}
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <path
                d="M6.68677 6.98629C7.48677 6.76629 8.33343 6.76629 9.13343 6.98629"
                stroke={color}
                stroke-linecap="round"
                stroke-linejoin="round"
            />

        </svg>
    );
};

export default MicIcon;
