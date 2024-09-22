import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfViewStyle, approvalPdfViewStyle } from './PDFViewStyle';

export interface PDFViewProps {
  file: string | undefined;
  isWithHeader?: boolean;
}

const PDFView: React.FC<PDFViewProps> = ({ file, isWithHeader }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div style={isWithHeader ? approvalPdfViewStyle : pdfViewStyle}>
      {!isWithHeader &&
        <p>
          Page {pageNumber} of {numPages}
        </p>
      }
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />;
          })}
      </Document>
    </div>
  );
};

export default PDFView;
