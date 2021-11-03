import {Component, OnInit} from '@angular/core';
import {UserAdministrationHttpService} from '@services/core/user-administration-http.service';
import {MessageService} from '@services/core/message.service';
import {UserModel} from '@models/core';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit {
  users: UserModel[] = [];
  loading: boolean = false;

  constructor(private userAdministrationHttpService: UserAdministrationHttpService, public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userAdministrationHttpService.getUsers().subscribe(
      response => {
        this.loading = false;
        this.users = response.data;
      }, error => {
        this.loading = false;
        this.messageService.error(error);
      }
    );
  }

}
