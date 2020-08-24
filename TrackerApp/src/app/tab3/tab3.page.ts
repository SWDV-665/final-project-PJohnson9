import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Defaults to show previous month
  Today = new Date();
  StartDate = new Date(this.Today.getFullYear(), this.Today.getMonth()-1, 1).toLocaleDateString('en-US');
  EndDate = new Date(this.Today.getFullYear(), this.Today.getMonth(), 0).toLocaleDateString('en-US');
  Total = "";

  Receipts = [];
  receipts = [];

  constructor(private db: DatabaseService) {}

  async CalculateTotal() {
    this.Receipts = await this.db.getReceipts();

    // Goes through all receipts to find ones within date range.
    let total = 0.0;
    this.receipts = []
    this.Receipts.forEach(r =>{
      if ( r.date >= new Date(this.StartDate)
          && r.date <= new Date(this.EndDate)
          && !isNaN(r.amount)) {
        total += r.amount;
        this.receipts.push(r)
      }
    } );

    this.Total = total.toString();
    
    
  }

}
