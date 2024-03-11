// pdfUtils.js

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = (canvasRef, filename) => {
  const capture = canvasRef.current;

  html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    doc.addImage(imgData, 'JPEG', 0, 0, width, height);
    doc.save(filename);
  });
};
