import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
    private notificationService: NotificationService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map((createdUser) => UserActions.registerSuccess({ user: createdUser })),
          catchError((error) => of(UserActions.registerFailure({ payload: error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(() => {
          this.notificationService.showSuccess('Cuenta creada correctamente');
          this.router.navigateByUrl('home');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al crear la cuenta');
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          map((updatedUser) => UserActions.updateUserSuccess({ userId, user: updatedUser })),
          catchError((error) => of(UserActions.updateUserFailure({ payload: error })))
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.notificationService.showSuccess('Perfil actualizado correctamente');
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al actualizar el perfil');
        })
      ),
    { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => UserActions.getUserByIdSuccess({ userId, user })),
          catchError((error) => of(UserActions.getUserByIdFailure({ payload: error })))
        )
      )
    )
  );

  getUserByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserByIdFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );
}
