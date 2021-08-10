import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routes
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/beverages', pathMatch: 'full' },
  { path: 'category', redirectTo: '/category/beverages', pathMatch: 'full' },

  {
    path: 'category',
    component: ProductListingComponent,
    children: [
      {
        path: ':category', // child route path
        component: ProductComponent, // child route component that the router renders
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
