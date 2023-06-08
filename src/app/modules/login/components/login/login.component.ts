import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username='';
  password= ''

  constructor(private authSvc: AuthService){

  }
  onSubmit() {
    // Aquí puedes acceder a this.username y this.password para realizar acciones con los datos del formulario
    console.log(this.username)
    console.log(this.password);
    this.authSvc.login(this.username,this.password)
    
  }
  ngOnInit():void{

  }

}
