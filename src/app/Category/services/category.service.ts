import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { CategoryDTO } from '../models/category.dto';

export interface DeleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly controller = 'categories';
  private readonly url = `${this.baseUrl}/${this.controller}`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  getCategoriesByUserId(userId: string): Observable<CategoryDTO[]> {
    return this.http
      .get<CategoryDTO[]>(`${this.baseUrl}/users/categories/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  createCategory(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http
      .post<CategoryDTO>(this.url, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoryById(categoryId: string): Observable<CategoryDTO> {
    return this.http
      .get<CategoryDTO>(`${this.url}/${categoryId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCategory(
    categoryId: string,
    category: CategoryDTO
  ): Observable<CategoryDTO> {
    return this.http
      .put<CategoryDTO>(`${this.url}/${categoryId}`, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteCategory(categoryId: string): Observable<DeleteResponse> {
    return this.http
      .delete<DeleteResponse>(`${this.url}/${categoryId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
