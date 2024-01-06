export const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => { resolve((e.target!).result); };
    reader.readAsDataURL(file);
  });
};
export const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => { resolve(img); };
    img.src = dataURL;
  });
};
export const canvastoBase64 = (canvas: HTMLCanvasElement, type: string): Promise<string> => {
  return new Promise((resolve) => { resolve(canvas.toDataURL(type)); });
};

interface PictureConfig {
  type?:string;
  width?: number;
  height?: number;
}

export function compressionPicture<T extends File>(file: T, config?: PictureConfig) {
  return new Promise<string>(async (resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = config?.width || 20;
    canvas.height = config?.height || 20;
    const context = canvas.getContext('2d');
    const base64 = await fileToDataURL(file);
    const img = await dataURLToImage(base64);
    context!.imageSmoothingEnabled = true;
    context!.clearRect(0, 0, canvas.width, canvas.height);
    context!.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = await canvastoBase64(canvas, config?.type || 'image/png')
    resolve(dataUrl);
  })
}