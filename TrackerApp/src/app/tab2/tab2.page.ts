import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { DatabaseService, Receipt } from '../services/database.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  Today = new Date().toLocaleDateString('en-US');
  Date = this.Today;
  Amount = "";
  Store = "";

  // constructor() {}
  constructor(public photoService: PhotoService, private db: DatabaseService) { }

  receipts = this.photoService.receipts;

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  saveReceipt(){

    let receipt = {
      key: null,
      date: new Date(this.Date),
      store: this.Store,
      amount: parseFloat(this.Amount),
      image: []
    }

    this.receipts.forEach(function (r) {
      receipt.image.push(r.base64);
    });

    this.db.addReceipt(receipt);

    this.Date = this.Today;
    this.Amount = "";
    this.Store = "";
    this.photoService.receipts = [];
    this.receipts = this.photoService.receipts;
  }
}

