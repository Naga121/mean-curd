import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AdminComponent } from './Components/admin/admin.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsDisplayComponent } from './Components/products-display/products-display.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products/list',component:ProductsDisplayComponent},
  {path:'products/admin',component:AdminComponent},
  {path:'products/add',component:AddProductComponent},
  {path:'products/:productId',component:EditProductComponent},
  {path:'**',component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
