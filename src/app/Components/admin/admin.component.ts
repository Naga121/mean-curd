import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/Modal/product';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products!:IProducts[];

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getAllProduct().subscribe(
      res=>{
        this.products=res
      }
    )
  }
  getProductId(productId:string){
    return productId.substring(productId.length-4)
  }

  delectProduct(productId:string){
    this.productService.deleteProduct(productId).subscribe(
      res=>{
        this.getProducts();
      }
    )
  }

}
