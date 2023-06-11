import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string="admin";
  password:string="12345";

  constructor(private authSvc: AuthService){

  }
  onSubmit() {
    // Aquí puedes acceder a this.username y this.password para realizar acciones con los datos del formulario
    
    if(this.username=="admin" && this.password=="12345"){
      this.authSvc.login(this.username,this.password)
    }else{
      alert("Usuario no registrado")  
    }
    
  }
  ngOnInit():void{

  }

}
