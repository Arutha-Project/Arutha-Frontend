import { Color, getThemeColor } from '@theme';

export const modalContainerStyle: React.CSSProperties = {
    minWidth: '60%',
    maxWidth: '60%',
};

export const modalBodyStyle: React.CSSProperties = {
    padding: '20px 10px',
};

export const modalHeaderStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '500',
    color: getThemeColor(Color.blackColor),
};
