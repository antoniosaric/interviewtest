import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResultsService } from '../_services/results.service';


@Component({
  selector: 'app-invoice-results',
  templateUrl: './invoice-results.component.html',
  styleUrls: ['./invoice-results.component.scss']
})
export class InvoiceResultsComponent implements OnInit {
  invoices: any;
  available_sort = [ "Select", "Invoice" , "Distributor", "Customer location", "Product"];
  orderInvoiceForm: FormGroup;
  search: any;

  constructor( 
      private resultService: ResultsService,
    ) { }

  ngOnInit() {
  }

  onOptionsSelected(event: any) {
      this.resultService.searchInvoices({search: event.target.value}).subscribe( data => {
        this.invoices = data;
      }, error => {
        console.log(error);
      }, () => {
      })
  }

}
