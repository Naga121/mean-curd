import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from 'src/app/Modal/product';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  public productId: string | null = '';
  public selectedProduct: IProducts={} as IProducts;
  public errorMsg: boolean;
  submittedError: boolean;

  constructor(
    public route: ActivatedRoute,
    private productService: ProductsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.productId = param.get('productId');
    });
    if (this.productId) {
      this.productService.getSingleProduct(this.productId).subscribe(
        (res) => {
          this.selectedProduct = res;
          console.log(this.selectedProduct);
        },
        (error) => {
          this.errorMsg = error;
        }
      );
    }
  }

  updateProduct() {
    if(this.selectedProduct.name !=='' && this.selectedProduct.price !=='' && this.selectedProduct.qty !==''  && this.selectedProduct.image !=='' && this.selectedProduct.info !==''){
      if(this.productId){
        this.productService.updateProduct(this.productId,this.selectedProduct).subscribe(
          (data:IProducts)=>{
            console.log(data);
            this.router.navigate(['/products/admin']).then();
          }
        )
      }

    }else{
    this.submittedError=true
    }
  }
}
