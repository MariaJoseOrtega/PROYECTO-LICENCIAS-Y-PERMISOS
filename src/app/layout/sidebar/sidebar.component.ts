import {Component, OnInit} from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
import {MenuHttpService} from '@services/core/menu-http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  display = false;
  items: MenuItem[] = [];

  constructor(private menuHttpService: MenuHttpService) {
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

}
