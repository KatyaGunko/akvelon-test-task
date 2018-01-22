import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class LoadingEffects {
  constructor(private actions$: Actions) {}
}
