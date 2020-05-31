import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.apiUrl;
  public isLogin:boolean = false;
  public user:any;

  constructor(
    private http:HttpClient
  ) {
    //this.loginDummy();
   }

  loginDummy(){
    this.isLogin = true;
    this.user = {_id: "5ed3f28a95d1a701f84661f6", name: "Javier Alarcon", email: "alarcon.vt@gmail.com", password: "K@milo92", __v: 0}
  }

  login(email:String, password:String){
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'user/login',{email:email,password:password}).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  createUser(params){
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'user/create',params).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  taskList(){
    console.log(this.user);
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'task/list',{email: this.user.email}).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  createTask(params){
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'task/create',params).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  editTask(params){
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'task/edit',params).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }

  deleteTask(params){
    return new Promise<any>(resolve=>{
      this.http.post(this.url + 'task/delete',params).subscribe(
        (data) =>{
          resolve(data);
        },
        (error)=>{
          console.log(error);
          resolve(false);
        }
      );
    });
  }
}
