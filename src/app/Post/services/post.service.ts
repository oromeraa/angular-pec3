import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { PostDTO } from '../models/post.dto';

interface UpdateResponse {
  affected: number;
}

interface DeleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly controller = 'posts';
  private readonly url = `${this.baseUrl}/${this.controller}`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getPosts(): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(this.url)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPostsByUserId(userId: string): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(`${this.baseUrl}/users/posts/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  createPost(post: PostDTO): Observable<PostDTO> {
    return this.http
      .post<PostDTO>(this.url, post)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPostById(postId: string): Observable<PostDTO> {
    return this.http
      .get<PostDTO>(`${this.url}/${postId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  updatePost(postId: string, post: PostDTO): Observable<PostDTO> {
    return this.http
      .put<PostDTO>(`${this.url}/${postId}`, post)
      .pipe(catchError(this.sharedService.handleError));
  }

  likePost(postId: string): Observable<UpdateResponse> {
    return this.http
      .put<UpdateResponse>(`${this.url}/like/${postId}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  dislikePost(postId: string): Observable<UpdateResponse> {
    return this.http
      .put<UpdateResponse>(`${this.url}/dislike/${postId}`, {})
      .pipe(catchError(this.sharedService.handleError));
  }

  deletePost(postId: string): Observable<DeleteResponse> {
    return this.http
      .delete<DeleteResponse>(`${this.url}/${postId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
