import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private auth: AuthService){

  }

  Logout():void{
    this.auth.logout();
  }
}
