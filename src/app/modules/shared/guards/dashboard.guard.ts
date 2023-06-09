import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class dashBoardGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if(!this.authSvc.isLoggedIn()){
      this.router.navigate(['/Login/']);
    }
    return this.authSvc.isLoggedIn();
  }
  
}
