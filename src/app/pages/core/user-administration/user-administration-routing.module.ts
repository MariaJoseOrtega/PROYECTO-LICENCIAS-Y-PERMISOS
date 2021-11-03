import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAdministrationComponent} from './user-administration.component';

const routes: Routes = [
  {
    path: '',
    component: UserAdministrationComponent,
    children:[

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdministrationRoutingModule {
}
