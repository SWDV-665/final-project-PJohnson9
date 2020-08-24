import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  receipts: any = [];
  conObj: any;
  Image = "";

  constructor(private db: DatabaseService) {
    // this.init();

    this.readReceipts();
  }



  // Retreive all receipt data from database
  async readReceipts(){

    this.receipts = await this.db.getReceipts();

  }

  showImages(base64: string){
    this.Image = base64;
    
  }

}
;