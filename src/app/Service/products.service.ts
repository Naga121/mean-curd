import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProducts } from '../Modal/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  public createProduct(product: IProducts): Observable<IProducts> {
    let url="http://127.0.0.1:3000/api/v1/products";
    return this.http.post<IProducts>(url,product)
      .pipe(catchError(this.handleError));
  }
  public updateProduct(productId:string,product: IProducts): Observable<IProducts> {
    let url=`http://127.0.0.1:3000/api/v1/products/${productId}`;
    return this.http
      .put<IProducts>(url, product)
      .pipe(catchError(this.handleError));
  }
  public getAllProduct(): Observable<IProducts[]> {
    let url=`http://127.0.0.1:3000/api/v1/products`;

    return this.http .get<IProducts[]>(url)
      .pipe(catchError(this.handleError));
  }
  public getSingleProduct(productId:string): Observable<IProducts> {
    let url=`http://127.0.0.1:3000/api/v1/products/${productId}`;
    return this.http
      .get<IProducts>(url)
      .pipe(catchError(this.handleError));
  }
  public deleteProduct(productId:string): Observable<IProducts> {
    let url=`http://127.0.0.1:3000/api/v1/products/${productId}`;
    return this.http
      .delete<IProducts>(url)
      .pipe(catchError(this.handleError));
  }

  // error Handiling
  private handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.status == 0) {
      errorMsg = `An error occurred: ${error.error}`;
    } else {
      errorMsg = `Backend returned code ${error.status}, body was :${error.error}`;
    }
    errorMsg += `Please try again later`;
    return throwError(errorMsg);
  }
}
