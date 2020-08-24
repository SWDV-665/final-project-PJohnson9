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

    // Displays new image on page
    const savedImageFile = await this.saveReceiptImage(capturedPhoto);
    this.receipts.push({
      webviewPath: capturedPhoto.webPath,
      //base64: await this.readAsBase64(capturedPhoto)
      base64: savedImageFile.base64
    });
  }

  private async saveReceiptImage(cameraPhoto: CameraPhoto){ 
      // Convert photo to base64 format
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      webviewPath: cameraPhoto.webPath,
      base64: base64Data
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
  webviewPath: string;
  base64?: string;
}




