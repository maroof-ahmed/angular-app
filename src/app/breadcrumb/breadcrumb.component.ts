import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  category: any;
  breadcrumb: any;

  ngOnInit(): void {
    this.category = this.router.url.split('/').pop();
    this.breadcrumb = this.category;
  }
}
