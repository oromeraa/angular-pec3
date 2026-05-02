import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostActions from '../actions';
import { PostService } from '../services/post.service';

@Injectable()
export class PostsEffects {
  private responseOK = false;
  private errorResponse: any = null;

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  // GET POSTS BY USER
  getPostsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPostsByUserId),
      exhaustMap(({ userId }) =>
        this.postService.getPostsByUserId(userId).pipe(
          map((posts) => PostActions.getPostsByUserIdSuccess({ posts })),
          catchError((error) =>
            of(PostActions.getPostsByUserIdFailure({ payload: error }))
          )
        )
      )
    )
  );

  getPostsByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.getPostsByUserIdFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // DELETE POST
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      exhaustMap(({ postId }) =>
        this.postService.deletePost(postId).pipe(
          map(() => PostActions.deletePostSuccess({ postId })),
          catchError((error) =>
            of(PostActions.deletePostFailure({ payload: error }))
          )
        )
      )
    )
  );

  deletePostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.deletePostFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // GET POST BY ID
  getPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPostById),
      exhaustMap(({ postId }) =>
        this.postService.getPostById(postId).pipe(
          map((post) => PostActions.getPostByIdSuccess({ post })),
          catchError((error) =>
            of(PostActions.getPostByIdFailure({ payload: error }))
          )
        )
      )
    )
  );

  getPostByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.getPostByIdFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // CREATE POST
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      exhaustMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((createdPost) =>
            PostActions.createPostSuccess({ post: createdPost })
          ),
          catchError((error) =>
            of(PostActions.createPostFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('posts');
            }
          })
        )
      )
    )
  );

  createPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.createPostSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  createPostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.createPostFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // UPDATE POST
  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      exhaustMap(({ postId, post }) =>
        this.postService.updatePost(postId, post).pipe(
          map((updatedPost) =>
            PostActions.updatePostSuccess({
              postId,
              post: updatedPost,
            })
          ),
          catchError((error) =>
            of(PostActions.updatePostFailure({ payload: error }))
          ),
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('posts');
            }
          })
        )
      )
    )
  );

  updatePostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.updatePostSuccess),
        tap(() => {
          this.responseOK = true;
          this.errorResponse = null;
        })
      ),
    { dispatch: false }
  );

  updatePostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.updatePostFailure),
        tap(({ payload }) => {
          this.responseOK = false;
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // GET ALL POSTS
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPosts),
      exhaustMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostActions.getPostsFailure({ payload: error }))
          )
        )
      )
    )
  );

  getPostsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.getPostsFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // LIKE POST
  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likePost),
      exhaustMap(({ postId }) =>
        this.postService.likePost(postId).pipe(
          map(() => PostActions.likePostSuccess({ postId })),
          catchError((error) =>
            of(PostActions.likePostFailure({ payload: error }))
          )
        )
      )
    )
  );

  likePostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.likePostFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );

  // DISLIKE POST
  dislikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.dislikePost),
      exhaustMap(({ postId }) =>
        this.postService.dislikePost(postId).pipe(
          map(() => PostActions.dislikePostSuccess({ postId })),
          catchError((error) =>
            of(PostActions.dislikePostFailure({ payload: error }))
          )
        )
      )
    )
  );

  dislikePostFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.dislikePostFailure),
        tap(({ payload }) => {
          this.errorResponse = payload.error;
          this.sharedService.errorLog(payload.error);
        })
      ),
    { dispatch: false }
  );
}
