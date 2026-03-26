import type { ConversionSettings } from '../App';

export async function convertPngToSvg(
  file: File,
  settings: ConversionSettings,
  email: string
): Promise<string> {

  const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "http://159.89.168.232:8010";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  const response = await fetch(`${backendUrl}/convert`, {
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