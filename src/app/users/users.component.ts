import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users/users.service';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../core/interfaces/user';
import { LoadingService } from '../core/services/loading/loading.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users$: Observable<IUser[]> = this.usersService.usersList$;
  public usersListLoading$: Observable<boolean> = this.loadingService
    .getUsersInProgress$;
  public deleteUserInProgress$ = this.loadingService.deleteUserInProgress$;

  public userToDelete: IUser;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.usersService.getUsersList();
  }

  public openDeleteModal(user: IUser): void {
    this.userToDelete = user;
    this.ngxSmartModalService.getModal('deleteModal').open();
  }

  public deleteUser(id: string): void {
    this.usersService.deleteUser(id);
    this.ngxSmartModalService.getModal('deleteModal').close();
    this.router.navigate(['/users']);
  }
}
