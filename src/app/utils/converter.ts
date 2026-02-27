import ImageTracer from 'imagetracerjs';
import type { ConversionSettings } from '../App';

export async function convertPngToSvg(
  file: File,
  settings: ConversionSettings
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Create a canvas to handle background removal if needed
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Remove background if enabled
          if (settings.removeBackground) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            // Simple background removal: make white/light pixels transparent
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const brightness = (r + g + b) / 3;
              
              // If pixel is very light (close to white), make it transparent
              if (brightness > 240) {
                data[i + 3] = 0; // Set alpha to 0
              }
            }
            ctx.putImageData(imageData, 0, 0);
          }

          // ImageTracer options based on settings
          const options = {
            // Tracing options
            ltres: 1, // Line threshold - lower = more detail
            qtres: settings.smoothness, // Quadratic spline threshold
            pathomit: Math.max(1, 10 - settings.detailLevel * 2), // Path omit - higher = less detail
            
            // SVG rendering options
            scale: 1,
            strokewidth: 0,
            linefilter: true,
            
            // Color options
            numberofcolors: Math.min(16, 4 + settings.detailLevel * 2),
            mincolorratio: 0.02,
            colorsampling: 2,
            
            // Other options
            blurradius: Math.max(0, 3 - settings.detailLevel),
            blurdelta: 20,
          };

          // Use the callback-based API
          ImageTracer.imageToSVG(
            canvas.toDataURL('image/png'),
            (svgString: string) => {
              resolve(svgString);
            },
            options
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}