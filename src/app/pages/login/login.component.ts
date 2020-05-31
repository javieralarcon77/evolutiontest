import { Component, OnInit } from '@angular/core';
import Swal from'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:String = "";
  password:String = "";
  constructor(
    private api:ApiService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  async login(){
    const data = await this.api.login(this.email,this.password);
    console.log(data);
    if(data && !data.error){
      this.api.isLogin = true;
      this.api.user = data.data;
      this.router.navigate(['home']);
    }else{
      Swal.fire("","Error al ingresar",'error');
    }
  }

}
