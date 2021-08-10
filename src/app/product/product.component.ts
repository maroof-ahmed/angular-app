import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import CONSTANTS from '../app.constants';
import helpers from '../app.helpers';

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
    // Override the route reuse strategy so that when the same component is loaded with different route params, the same component is not reused but re-initialized
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  category: any;
  apiUrl: string = CONSTANTS.apiUrl;
  accessKey: string = CONSTANTS.accessKey;
  loading: boolean = true;
  isFirstLoad: boolean = true;
  productList: any[] = [];
  pageNum: number = 1;
  errorMessage: string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.category = params.get('category');
    });

    let cats = ['beverages', 'frozen'];

    if (!cats.includes(this.category)) {
      this.router.navigate(['404']);
    }

    if (this.isFirstLoad) this.getProductList(this.pageNum);
  }

  getProductList(pageNum: number) {
    this.loading = true;

    if (this.category == 'frozen') this.category = 'meat-meat';

    const promise = this.http
      .get<[]>(
        `${this.apiUrl}/products?categorySlug=${this.category}&per_page=25&page=${pageNum}`,
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
        let previousProductsList = [...this.productList];
        this.productList = [...this.productList, ...response];
        let newProductsList = this.productList;
        this.loading = false;
        this.isFirstLoad = false;

        if (previousProductsList.length === newProductsList.length) {
          this.errorMessage = 'No more products found!';
        }
        if (newProductsList.length === 0) {
          this.errorMessage = 'No products found!';
        }
      },
      (error: any) => {
        // Error callback
        // this.errorMessage = error.error?.message
        //   ? 'ERROR: ' + error.error.message
        //   : 'ERROR: ' + error.message;
        this.loading = false;
        this.isFirstLoad = false;
        this.errorMessage = helpers.getErrorMessage(
          error.status ? error.status : error.error.statusCode
        );
        console.log(error);
      }
    );
  }

  loadMoreProducts(event: any, ref?: any): void {
    this.pageNum++;
    this.getProductList(this.pageNum);
  }
}
