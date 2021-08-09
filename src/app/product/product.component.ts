import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import CONSTANTS from '../app.constants';

@Component({
  selector: 'div[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.category = params.get('category');
    });

    // Override the route reuse strategy so that when the same component is loaded with different route params, the same component is not reused but re-initialized
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  category: any;
  apiUrl: string = CONSTANTS.apiUrl;
  accessKey: string = CONSTANTS.accessKey;
  loading: boolean = true;
  productList: any[] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.category = params.get('category');
    });

    this.getProductList();
  }

  getProductList() {
    if (this.category == 'frozen') this.category = 'meat-meat';

    const promise = this.http
      .get<[]>(
        `${this.apiUrl}/products?categorySlug=${this.category}&per_page=25&page=1`,
        {
          headers: {
            'access-key': this.accessKey,
          },
        }
      )
      .toPromise();

    return promise.then(
      (response: any) => {
        // Success callback
        this.productList = response;
        this.loading = false;
      },
      (error: any) => {
        // Error callback
        // this.errorMessage = error.error?.message
        //   ? 'ERROR: ' + error.error.message
        //   : 'ERROR: ' + error.message;
        this.errorMessage = 'No products found!!';
        console.log(error);
      }
    );
  }
}
