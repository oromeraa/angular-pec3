import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AuthDTO } from '../models/auth.dto';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly controller = 'auth';
  private readonly url = `${this.baseUrl}/${this.controller}`;

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.url, auth)
      .pipe(catchError(this.sharedService.handleError));
  }
}
