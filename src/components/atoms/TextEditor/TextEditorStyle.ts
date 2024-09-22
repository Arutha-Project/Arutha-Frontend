import { Color, Intensity, getThemeColor } from '@theme';

export const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px'
};

export const okBtnStyle: React.CSSProperties = {
    borderRadius: '38px',
    height: '44px',
    maxHeight: '44px',
    minWidth: '131px',
    padding: '10px 16px',
    marginLeft: '8px',
    backgroundColor: getThemeColor(Color.primaryColor, Intensity.Bold),
    color: getThemeColor(Color.whiteColor),
    fontSize: '16px',
    fontFamily: 'Google Sans',
    fontWeight: '500',
    lineHeight: '24px',
};
