import { Component, OnInit } from '@angular/core';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  empty:String = "";
  name:String = "";
  email:String = "";
  password:String = "";
  submit:boolean = false;
  constructor(
    private router:Router,
    private api:ApiService
  ) { }

  ngOnInit(): void {
  }

  async createUser(){
    this.submit = true;
    if(this.name == "" || this.email == "" || this.password == "")
      return;
    this.submit = false;

    let user = {
      email:this.email,
      name:this.name,
      password: this.password
    }
    
    const data = await this.api.createUser(user);
    console.log(data);
    if(data && !data.error){
      this.api.isLogin = true;
      this.api.user = data.data;
      this.router.navigate(['home']);
    }else{
      Swal.fire("","Error al registrar",'error');
    }

  }

}
