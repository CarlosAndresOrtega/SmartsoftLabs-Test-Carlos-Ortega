import { CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../../core/service/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class checkLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    if(this.authSvc.isLoggedIn()){
      this.router.navigate(['/dashboard/']);
    }
    return !this.authSvc.isLoggedIn();
    
  }
  
}
