import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailedInfoComponent } from './users/user-detailed-info/user-detailed-info.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserDetailedInfoComponent
      },
      {
        path: ':id',
        component: UserDetailedInfoComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: UsersComponent }
];
