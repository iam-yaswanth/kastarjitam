import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export async function exportToPDF(content: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.setFont('helvetica');
  doc.setFontSize(12);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  const maxWidth = pageWidth - 2 * margin;

  doc.setFillColor(255, 248, 240);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(180, 130, 80);
  doc.setLineWidth(0.5);
  for (let i = 0; i < 35; i++) {
    const y = margin + i * lineHeight;
    if (y < pageHeight - margin) {
      doc.line(margin, y, pageWidth - margin, y);
    }
  }

  doc.setTextColor(120, 63, 4);
  doc.setFontSize(18);
  doc.text('My Diary', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(160, 90, 40);
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  doc.text(date, pageWidth - margin, 15, { align: 'right' });

  doc.setFontSize(12);
  doc.setTextColor(80, 50, 30);

  const lines = doc.splitTextToSize(content || 'No content', maxWidth);
  let y = margin + 10;

  lines.forEach((line: string) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      doc.setFillColor(255, 248, 240);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setDrawColor(180, 130, 80);
      doc.setLineWidth(0.5);
      for (let i = 0; i < 35; i++) {
        const lineY = margin + i * lineHeight;
        if (lineY < pageHeight - margin) {
          doc.line(margin, lineY, pageWidth - margin, lineY);
        }
      }

      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  });

  doc.save(`diary-${Date.now()}.pdf`);
}

export async function exportToWord(content: string) {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const paragraphs = content.split('\n').map(line =>
    new Paragraph({
      children: [
        new TextRun({
          text: line || ' ',
          font: 'Calibri',
          size: 24,
          color: '4A3728',
        }),
      ],
      spacing: {
        after: 200,
      },
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: 'My Diary',
                font: 'Garamond',
                size: 36,
                bold: true,
                color: '8B4513',
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: date,
                font: 'Calibri',
                size: 20,
                color: '996633',
              }),
            ],
            spacing: {
              after: 400,
            },
          }),
          ...paragraphs,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `diary-${Date.now()}.docx`);
}
