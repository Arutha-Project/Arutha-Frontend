import { Color, Intensity, getThemeColor } from '@theme';

export const sendingCommentContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '15px',
};

export const receivingCommentContainerStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '15px',
};

export const sendingCommentStyle: React.CSSProperties = {
    backgroundColor: getThemeColor(Color.primaryColor, Intensity.Light),
    borderRadius: '10px 0 10px 10px',
    textAlign: 'right',
    width: 'fit-content',
    padding: '10px 10px 20px 10px',
    margin: '0 10px',
    fontFamily: 'Google Sans',
    fontSize: '16px',
    color: '#322E2E',
    fontWeight: '400',
    lineHeight: '24px',
};

export const receivingCommentStyle: React.CSSProperties = {
    backgroundColor: getThemeColor(Color.neutralColor, Intensity.Soft),
    borderRadius: '0 10px 10px 10px',
    textAlign: 'left',
    width: '100%',
    padding: '10px 10px 20px 10px',
    margin: '0 10px',
    fontFamily: 'Google Sans',
    fontSize: '16px',
    color: '#322E2E',
    fontWeight: '400',
    lineHeight: '24px',
};

export const commentStyle: React.CSSProperties = {
    padding: '10px 10px 20px 10px',
    margin: '0 10px',
};
