import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as CategoryActions from '../actions';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoriesEffects {
  private responseOK = false;
  private errorResponse: any = null;

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  // GET BY USER ID
  getCategoriesByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesByUserId),
      exhaustMap(({ userId }) =>
        this.categoryService.getCategoriesByUserId(userId).pipe(
          map((categories) =>
            CategoryActions.getCategoriesByUserIdSuccess({ categories })
          ),
          catchError((error) =>
            of(CategoryActions.getCategoriesByUserIdFailure({ payload: error }))
          )
        )
      )
    )
  );

  getCategoriesByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesByUserIdFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // DELETE
  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      exhaustMap(({ categoryId }) =>
        this.categoryService.deleteCategory(categoryId).pipe(
          map(() => CategoryActions.deleteCategorySuccess({ categoryId })),
          catchError((error) =>
            of(CategoryActions.deleteCategoryFailure({ payload: error }))
          )
        )
      )
    )
  );

  deleteCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.deleteCategoryFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // GET BY ID
  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap(({ categoryId }) =>
        this.categoryService.getCategoryById(categoryId).pipe(
          map((category) =>
            CategoryActions.getCategoryByIdSuccess({ category })
          ),
          catchError((error) =>
            of(CategoryActions.getCategoryByIdFailure({ payload: error }))
          )
        )
      )
    )
  );

  getCategoryByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoryByIdFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // CREATE
  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      exhaustMap(({ category }) =>
        this.categoryService.createCategory(category).pipe(
          map((createdCategory) =>
            CategoryActions.createCategorySuccess({
              category: createdCategory,
            })
          ),
          catchError((error) =>
            of(CategoryActions.createCategoryFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'categoryFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('categories');
            }
          })
        )
      )
    )
  );

  createCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategorySuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  createCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategoryFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      exhaustMap(({ categoryId, category }) =>
        this.categoryService.updateCategory(categoryId, category).pipe(
          map((updatedCategory) =>
            CategoryActions.updateCategorySuccess({
              categoryId,
              category: updatedCategory,
            })
          ),
          catchError((error) =>
            of(CategoryActions.updateCategoryFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'categoryFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('categories');
            }
          })
        )
      )
    )
  );

  updateCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategorySuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  updateCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategoryFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );
}
