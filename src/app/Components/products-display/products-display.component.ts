import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/Modal/product';
import { ProductsService } from 'src/app/Service/products.service';

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.scss']
})
export class ProductsDisplayComponent implements OnInit {

  vegItems=[
    {name:'Carrot',price:25, dis:29,qty:"1 Kg",img:'https://www.bigbasket.com/media/uploads/p/l/10000072_16-fresho-carrot-orange.jpg'},
    {name:'Potato - New Crop',price:20,dis:24,qty:"1/4 Kg",img:'https://www.bigbasket.com/media/uploads/p/l/40048457_7-fresho-potato-new-crop.jpgg'},
    {name:'Fresho Chilli - Green',price:15,dis:29,qty:"100 g",img:'https://www.bigbasket.com/media/uploads/p/l/50000511_7-fresho-chilli-green-organically-grown.jpg'},
    {name:'Coriander, Palak, Curry',price:30,dis:34,qty:"100 g",img:'https://www.bigbasket.com/media/uploads/p/l/1209661_3-fresho-methi-250-g-coriander-leaves-100-g-palak-250-g-curry-leaves-100-g.jpg'},
  ]
  products:IProducts[]=[];
  constructor(private  ProductService:ProductsService) { }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.ProductService.getAllProduct().subscribe(
      res=>{
        this.products=res
      }
    )
  }

}
