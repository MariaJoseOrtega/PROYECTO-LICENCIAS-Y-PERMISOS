import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {BreadcrumbService} from '@services/core/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
  subscription: Subscription;
  items: MenuItem[] = [];

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response as MenuItem[];
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
