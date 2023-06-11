import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/modules/core/service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private render:Renderer2){

  }
  ngOnInit() {
   
  }

  Logout():void{
    this.auth.logout();
  }
}
