import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/Modal/product';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product:IProducts={
    _id:'',
    name:'',
    price:'',
    qty:'',
    image:'',
    info:''
  }
  submittedError!:boolean;
  submittedsuccess!:boolean;

  constructor(public productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }
  submiteProduct(){
    if(this.product.name !=='' && this.product.price !=='' && this.product.qty !==''  && this.product.image !=='' && this.product.info !==''){
      console.log(this.product);
      this.productService.createProduct(this.product).subscribe(
        (data:IProducts)=>{
          console.log(data);
          this.submittedsuccess=true
          this.router.navigate(['/products/admin']).then();
        }
      )
    }else{
    this.submittedError=true
    }
  }

}
