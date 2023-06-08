import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../../shared/models/user.interface';
import { Observable, catchError, map,throwError,of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) { }


  private localStorageKey = 'currentUser';

  login(username: string, password: string): Observable<any> {
    const user: User = { username: username, password: password };
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    this.router.navigate(['/dashboard/']);
    return of(user);
  }
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.localStorageKey);
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem(this.localStorageKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
