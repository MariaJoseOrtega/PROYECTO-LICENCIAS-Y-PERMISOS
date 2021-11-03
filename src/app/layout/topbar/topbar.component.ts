import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenuHttpService} from '@services/core/menu-http.service';
import {AuthHttpService, MessageService} from "@services/core";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  display = false;
  items: MenuItem[] = [];
  showNav: boolean = true;

  constructor(private menuHttpService: MenuHttpService,
              private authHttpService: AuthHttpService, private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.getMenus();
  }

  getMenus() {
    this.menuHttpService.getMenus().subscribe(
      response => {
        this.items = response.data;
      }, error => {
        console.log(error);
      }
    )
  }

  logout() {
    this.messageService.showLoading();
    this.authHttpService.logout().subscribe(response => {
      this.messageService.success(response);
      this.messageService.hideLoading();
      this.router.navigate(['/authentication/login'])
    }, error => {
      this.messageService.hideLoading();
      this.messageService.error(error);
      this.router.navigate(['/authentication/login'])
    });
  }
}
