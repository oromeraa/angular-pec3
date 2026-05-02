import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as AuthActions from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private responseOK: boolean = false;
  private errorResponse: any = null;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((userToken) => {
            const credentialsTemp: AuthDTO = {
              email: credentials.email,
              password: credentials.password,
              user_id: userToken.user_id,
              access_token: userToken.access_token,
            };

            return AuthActions.loginSuccess({ credentials: credentialsTemp });
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('home');
            }
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );
}
