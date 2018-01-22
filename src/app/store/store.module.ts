import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

// EFFECTS
import { UsersEffects } from './users/users.effects';
import { LoadingEffects } from './loading/loading.effects';

@NgModule({
  imports: [
    EffectsModule.runAfterBootstrap(UsersEffects),
    EffectsModule.runAfterBootstrap(LoadingEffects)
  ]
})
export class AppStoreModule {}
