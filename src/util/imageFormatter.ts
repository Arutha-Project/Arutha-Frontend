export const processImage = async (imageSrc: string, width: number, height: number) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not found");

      // Step 1: Resize to small resolution
      const pixelSize = 10; // Adjust for more/less pixelation
      const smallWidth = Math.floor(width / pixelSize);
      const smallHeight = Math.floor(height / pixelSize);

      canvas.width = smallWidth;
      canvas.height = smallHeight;
      ctx.drawImage(img, 0, 0, smallWidth, smallHeight);

      // Step 2: Convert to grayscale
      const imageData = ctx.getImageData(0, 0, smallWidth, smallHeight);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // R
        data[i + 1] = avg; // G
        data[i + 2] = avg; // B
      }
      ctx.putImageData(imageData, 0, 0);

      // Step 3: Resize back to original size
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = false; // Keep pixelation effect
      ctx.drawImage(canvas, 0, 0, smallWidth, smallHeight, 0, 0, width, height);

      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => reject("Error loading image");
  });
};