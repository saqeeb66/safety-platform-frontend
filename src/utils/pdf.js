import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = async () => {
  const element = document.body;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save("dashboard.pdf");
};