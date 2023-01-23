import { Component, OnInit } from '@angular/core';
import { ProductApiService } from 'src/app/services/network-calls/product-api.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  products = [];

  constructor(
    private productApiService: ProductApiService
  ) { }

  ngOnInit(): void {
    this.productApiService.getProducts().subscribe(response => {console.log(response);
    });
  }

  addtocart(){}

}
