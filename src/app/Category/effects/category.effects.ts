import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as CategoryActions from '../actions';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  getCategoriesByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesByUserId),
      exhaustMap(({ userId }) =>
        this.categoryService.getCategoriesByUserId(userId).pipe(
          map((categories) => CategoryActions.getCategoriesByUserIdSuccess({ categories })),
          catchError((error) => of(CategoryActions.getCategoriesByUserIdFailure({ payload: error })))
        )
      )
    )
  );

  getCategoriesByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesByUserIdFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      exhaustMap(({ categoryId }) =>
        this.categoryService.deleteCategory(categoryId).pipe(
          map(() => CategoryActions.deleteCategorySuccess({ categoryId })),
          catchError((error) => of(CategoryActions.deleteCategoryFailure({ payload: error })))
        )
      )
    )
  );

  deleteCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.deleteCategorySuccess),
        tap(() => {
          this.notificationService.showSuccess('Categoría eliminada correctamente');
        })
      ),
    { dispatch: false }
  );

  deleteCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.deleteCategoryFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al eliminar la categoría');
        })
      ),
    { dispatch: false }
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap(({ categoryId }) =>
        this.categoryService.getCategoryById(categoryId).pipe(
          map((category) => CategoryActions.getCategoryByIdSuccess({ category })),
          catchError((error) => of(CategoryActions.getCategoryByIdFailure({ payload: error })))
        )
      )
    )
  );

  getCategoryByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoryByIdFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      exhaustMap(({ category }) =>
        this.categoryService.createCategory(category).pipe(
          map((createdCategory) => CategoryActions.createCategorySuccess({ category: createdCategory })),
          catchError((error) => of(CategoryActions.createCategoryFailure({ payload: error })))
        )
      )
    )
  );

  createCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategorySuccess),
        tap(() => {
          this.notificationService.showSuccess('Categoría creada correctamente');
          this.router.navigateByUrl('categories');
        })
      ),
    { dispatch: false }
  );

  createCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategoryFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al crear la categoría');
        })
      ),
    { dispatch: false }
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      exhaustMap(({ categoryId, category }) =>
        this.categoryService.updateCategory(categoryId, category).pipe(
          map((updatedCategory) =>
            CategoryActions.updateCategorySuccess({ categoryId, category: updatedCategory })
          ),
          catchError((error) => of(CategoryActions.updateCategoryFailure({ payload: error })))
        )
      )
    )
  );

  updateCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategorySuccess),
        tap(() => {
          this.notificationService.showSuccess('Categoría actualizada correctamente');
          this.router.navigateByUrl('categories');
        })
      ),
    { dispatch: false }
  );

  updateCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategoryFailure),
        tap(({ payload }) => {
          this.sharedService.errorLog(payload.error);
          this.notificationService.showError(payload.error?.message || 'Error al actualizar la categoría');
        })
      ),
    { dispatch: false }
  );
}
