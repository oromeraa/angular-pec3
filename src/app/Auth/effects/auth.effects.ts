import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as AuthActions from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private notificationService: NotificationService
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
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.notificationService.showInfo('Sesión iniciada correctamente');
          this.router.navigateByUrl('home');
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al iniciar sesión');
        })
      ),
    { dispatch: false }
  );
}
