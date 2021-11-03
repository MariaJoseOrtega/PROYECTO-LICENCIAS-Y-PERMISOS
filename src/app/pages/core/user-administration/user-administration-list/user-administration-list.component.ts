import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UserModel} from '@models/core';
import {MenuItem} from 'primeng/api';
import {UserAdministrationHttpService} from '@services/core/user-administration-http.service';
import {MessageService} from '@services/core/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-administration-list',
  templateUrl: './user-administration-list.component.html',
  styleUrls: ['./user-administration-list.component.scss']
})
export class UserAdministrationListComponent implements OnInit {
  @Input() users: UserModel[] = [];
  @Input() loading: boolean = false;
  @Output() loadUsers = new EventEmitter<string>();

  selectedUsers: UserModel[] = [];
  selectedUser: UserModel = {};
  cols: any[];
  items: MenuItem[] = [];
  dialogForm: boolean = false;

  constructor(private userAdministrationHttpService: UserAdministrationHttpService,
              public messageService: MessageService,
              private router:Router) {
    this.cols = [
      {field: 'username', header: 'Número de documento'},
      {field: 'name', header: 'Nombres'},
      {field: 'lastname', header: 'Apellidos'},
      {field: 'email', header: 'Correo'}
    ];
    this.items = [
      {
        label: 'Eliminar Usuario', icon: 'pi pi-trash', command: () => {
          this.deleteUser(this.selectedUser);
        }
      },
      {
        label: 'Cambiar Contraseña', icon: 'pi pi-key', command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Suspender Usuario', icon: 'pi pi-user-minus', command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Cambiar RolesEnum', icon: 'pi pi-id-card', command: () => {
          this.changePassword();
        }
      },
      {
        label: 'Cambiar Permisos', icon: 'pi pi-sitemap', command: () => {
          this.changePassword();
        }
      }
    ];
  }

  ngOnInit(): void {

  }

  showForm(user: UserModel = {}) {
    this.selectedUser = user;
    this.dialogForm = true;
  }

  selectUser(user: UserModel) {
    this.selectedUser = user;
  }

  deleteUser(user: UserModel): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          this.userAdministrationHttpService.deleteUser(user.id).subscribe(
            response => {
              this.removeUser(user);
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });
  }

  deleteUsers(): void {
    this.messageService.questionDelete({})
      .then((result) => {
        if (result.isConfirmed) {
          const ids = this.selectedUsers.map(element => element.id);
          this.userAdministrationHttpService.deleteUsers(ids).subscribe(
            response => {
              this.removeUsers(ids);
              this.messageService.success(response);
            },
            error => {
              this.messageService.error(error);
            }
          );
        }
      });

  }

  removeUser(user: UserModel) {
    this.users = this.users.filter(element => element.id !== user.id);
  }

  removeUsers(ids: (number | undefined)[]) {
    for (const id of ids) {
      this.users = this.users.filter(element => element.id !== id);
    }
  }

  saveUser(user: UserModel) {
    const index = this.users.findIndex(element => element.id === user.id);
    if (index === -1) {
      this.users.push(user);
    } else {
      this.users[index] = user;
    }
    this.dialogForm = false;
  }

  changePassword(){

  }

  redirectNotFound(){
    this.router.navigate(['/common/not-found']);
  }
}
