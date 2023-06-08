import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/Login/Start',
    pathMatch:'full'
  },
  {
    path:'Start',
    component:LoginComponent,
    // canActivate: [CanActivateUrl]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
