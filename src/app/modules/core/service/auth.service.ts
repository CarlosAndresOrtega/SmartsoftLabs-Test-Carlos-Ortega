import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../../shared/models/user.interface';
import { Observable, catchError, map,throwError,of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  private localStorageKey = 'currentUser';

  get isLogged(): Observable<boolean>{
    return this.loggedIn$.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const user: User = { username: username, password: password };
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    this.router.navigate(['/dashboard/']);
    this.loggedIn$.next(true);
    return of(user);
  }
  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate(['/Login/']);
    this.loggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem(this.localStorageKey)){
      return true
    }else{
      return false
    }
  }

  getCurrentUser(): User | null {
    const userString = localStorage.getItem(this.localStorageKey);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }
}
