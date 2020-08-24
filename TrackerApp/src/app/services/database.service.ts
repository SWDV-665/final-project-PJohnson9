import { Injectable } from '@angular/core';
import { Storage, IonicStorageModule } from '@ionic/storage';
// import { Receipt } from '../receipt';

@Injectable({
    providedIn: 'root'
  })

export class DatabaseService
{
    constructor(private storage: Storage) {
    }

    public async getReceipts(): Promise<Receipt[]>{

        let receipts: Array<Receipt> = [];
        await this.storage.forEach((v, key, i)=>{
          if(key.startsWith("R")){
              receipts.push(v);
          }
        });
    
        // Returns the receipts sorted by date
        return receipts.sort((a,b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
      }


    public async addReceipt(receipt: Receipt){
      
      let key = (await this.storage.get('KeyCount')) + 1;
      this.storage.set('KeyCount', key);


      console.log("Adding Receipt with Key ", "R"+key ,": ", receipt);
      return await this.storage.set("R"+key, receipt);
    }
  
    public async update(receipt: Receipt){
      return await this.storage.set(receipt.key, receipt);
    }      

}

// Receipt Interface
export interface Receipt {
  key: string;
  date: Date;
  store: string;
  amount: number;
  image: String[];
}