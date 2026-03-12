import type { ConversionSettings } from '../App';

export async function convertPngToSvg(
  file: File,
  settings: ConversionSettings,
  email: string
): Promise<string> {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  const response = await fetch("http://localhost:8000/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Conversion failed");
  }

  const blob = await response.blob();
  const svgText = await blob.text();

  return svgText;
}