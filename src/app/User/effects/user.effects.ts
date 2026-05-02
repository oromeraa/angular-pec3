import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private responseOK = false;
  private errorResponse: any = null;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  // REGISTER
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map((createdUser) =>
            UserActions.registerSuccess({ user: createdUser })
          ),
          catchError((error) =>
            of(UserActions.registerFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'registerFeedback',
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

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // UPDATE USER
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          map((updatedUser) =>
            UserActions.updateUserSuccess({
              userId,
              user: updatedUser,
            })
          ),
          catchError((error) =>
            of(UserActions.updateUserFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'profileFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // GET USER BY ID
  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => UserActions.getUserByIdSuccess({ userId, user })),
          catchError((error) =>
            of(UserActions.getUserByIdFailure({ payload: error }))
          )
        )
      )
    )
  );

  getUserByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserByIdFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );
}
