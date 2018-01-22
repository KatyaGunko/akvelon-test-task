import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { AppStoreModule } from './store/store.module';
import { UsersComponent } from './users/users.component';
import { UserDetailedInfoComponent } from './users/user-detailed-info/user-detailed-info.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './core/services/users/users.service';
import { LoadingService } from './core/services/loading/loading.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoaderComponent } from './core/components/loader/loader.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let dev = [];
if (environment.envName === 'dev') {
  dev = [
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 15
    })
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailedInfoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppStoreModule,
    StoreModule.provideStore(reducers),
    HttpModule,
    HttpClientModule,
    ...dev,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [UsersService, LoadingService, NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
