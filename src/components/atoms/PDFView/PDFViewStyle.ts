import { Color, getThemeColor } from "@theme";

export const pdfViewStyle: React.CSSProperties = {
    padding: '1px 5px 5px 5px',
    backgroundColor: '#dedede',
    marginTop: '50px',
    marginBottom: '50px',
    overflow: 'scroll'
};

export const approvalPdfViewStyle: React.CSSProperties = {
    flexWrap: 'wrap',
    display: 'flex',
    minWidth: '242px',
    minHeight: '197px',
    maxHeight: '412px',
    justifyContent: ' space-between',
    alignItems: 'flex-start',
    padding: '1px 5px 5px 5px',
    gap: '10px',
    backgroundColor: getThemeColor(Color.whiteColor),
    border: `2px solid ${getThemeColor(Color.whiteColor)}`,
    borderRadius: '10px',
    flex: 1,
    marginLeft: '30px',
    marginRight: '20px',
    overflow: 'scroll'
};
