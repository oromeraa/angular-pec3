import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly controller = 'users';
  private readonly baseUrl = 'http://localhost:3000/';
  private readonly url = `${this.baseUrl}${this.controller}`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.url, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .put<UserDTO>(`${this.url}/${userId}`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(`${this.url}/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
