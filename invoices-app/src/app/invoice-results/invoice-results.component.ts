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
    this.invoices = [
      {
        "invoice_number": 1111,
        "invoice_date": "2020-10-22T07:00:00.000Z",
        "distributor_name": "Dist A",
        "distributor_address": "D Address A",
        "customer_name": "Cust A",
        "customer_address": "C Address A",
        "customer_contact": "C Contact A",
        "manufacturer_name": "Manuf A",
        "manufacturer_address": "M Address A",
        "product_code": 1111,
        "description": "Almonds",
        "unit_of_measure": "CASE",
        "qty": 5,
        "weight": 7,
        "unit_price": 7,
        "total_price": 7+5,
      },
      {
        "invoice_number": 1112,
        "invoice_date": "2020-10-22T07:00:00.000Z",
        "distributor_name": "Dist A",
        "distributor_address": "D Address A",
        "customer_name": "Cust A",
        "customer_address": "C Address A",
        "customer_contact": "C Contact A",
        "manufacturer_name": "Manuf A",
        "manufacturer_address": "M Address A",
        "product_code": 1111,
        "description": "Almonds",
        "unit_of_measure": "CASE",
        "qty": 5,
        "weight": 7,
        "unit_price": 7,
        "total_price": 7+5,
      },
      {
        "invoice_number": 1113,
        "invoice_date": "2020-10-22T07:00:00.000Z",
        "distributor_name": "Dist A",
        "distributor_address": "D Address A",
        "customer_name": "Cust A",
        "customer_address": "C Address A",
        "customer_contact": "C Contact A",
        "manufacturer_name": "Manuf A",
        "manufacturer_address": "M Address A",
        "product_code": 1111,
        "description": "Almonds",
        "unit_of_measure": "CASE",
        "qty": 5,
        "weight": 7,
        "unit_price": 7,
        "total_price": 7+5,
      }
    ]
  }

  onOptionsSelected(event: any) {
      this.resultService.searchInvoices({search: event.target.value}).subscribe( data => {
        // console.log(this.search)
        console.log(data)
          this.invoices = data;
      }, error => {
        console.log(error);
      }, () => {
      })
  }



}
