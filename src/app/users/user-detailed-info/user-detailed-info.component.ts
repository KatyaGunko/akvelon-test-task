import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';
import { LoadingService } from '../../core/services/loading/loading.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-user-detailed-info',
  templateUrl: './user-detailed-info.component.html',
  styleUrls: ['./user-detailed-info.component.css']
})
export class UserDetailedInfoComponent implements OnInit, OnDestroy {
  public userDetailedInfoInProgress$ = this.loadingService
    .userDetailedInfoInProgress$;
  public userPositions$ = this.usersService.userPositions$;

  public userDetailsForm: FormGroup = this.fb.group({
    ['firstName']: ['', Validators.required],
    ['lastName']: ['', Validators.required],
    ['email']: ['', [Validators.required, Validators.email]],
    ['position']: ['']
  });

  private userId: string;
  private cancelSubscription$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params.id;
      if (this.userId) {
        this.usersService.getUserDetailedInfo(params.id);
      } else {
        this.usersService.clearSelectedUserInfo();
      }
    });
  }

  public ngOnInit() {
    this.usersService.getUserPositions();

    this.usersService.selectedUserInfo$
      .takeUntil(this.cancelSubscription$)
      .subscribe(userInfo => {
        this.userDetailsForm.patchValue(userInfo);
      });
  }

  public isFieldInvalid(fieldName: string): boolean {
    const control = this.userDetailsForm.get(fieldName);
    return control.touched && control.invalid;
  }

  public submit(): void {
    const data = this.userDetailsForm.value;

    if (this.userId) {
      this.usersService.updateUserDetailedInfo(this.userId, data);
    } else {
      this.usersService.saveUserDetailedInfo(data);
      this.userDetailsForm.reset();
    }
  }

  public ngOnDestroy() {
    this.cancelSubscription$.next();
    this.usersService.clearSelectedUserInfo();
  }
}
