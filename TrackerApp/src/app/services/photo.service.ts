import { Injectable } from '@angular/core';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  // Array of receipts
  public receipts: ReceiptImage[] = [];

  public async addNewToGallery() {
    // Take a picture of the receipt
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });

    // Adds new receipt
    const savedImageFile = await this.saveReceipt(capturedPhoto);
    this.receipts.unshift({
      filepath: "soon...",
      filename: "Receipt Image",
      webviewPath: capturedPhoto.webPath,
      base64: await this.readAsBase64(capturedPhoto)
    });
  }

  private async saveReceipt(cameraPhoto: CameraPhoto){ 
      // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  
}

// Track Receipt image and metadata
interface ReceiptImage {
  filepath: string;
  filename: string;
  webviewPath: string;
  base64?: string;
}



