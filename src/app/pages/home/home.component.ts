import { Component, OnInit } from '@angular/core';
import Swal from'sweetalert2';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks:Array<any> = [];
  constructor(
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.loadTaks();
  }

  async loadTaks(){
    const data = await this.api.taskList();
    if(data && !data.error){
      console.log(data);
      this.tasks = data.data.map(item=>{
        let expiration = item.expiration.split("T")[0];
        return {
          expiration: expiration,
          name: item.name,
          priority: item.priority,
          _id: item._id,
        }
      });
    }
  }

  async addTask(){
    await Swal.fire({
      title:"Agregar Tarea",
      html: 
        '<input id="swal-input1" placeholder="Nombre" type="text" class="swal2-input">' +
        '<input id="swal-input2" placeholder="Fecha Vencimiento" type="date" class="swal2-input">' + 
        '<select id="swal-input3" class="swal2-input"><option value="1">Prioridad Alta</option><option value="2">Prioridad Normal</option><option value="3">Prioridad Baja</option></select>',
      focusConfirm: false,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      preConfirm: (dat) => {
        let name:any = document.getElementById('swal-input1');
        let expiration:any = document.getElementById('swal-input2');
        let priority:any =  document.getElementById('swal-input3');

        if(name.value == "" || expiration.value == ""){
          Swal.showValidationMessage("Debes llenar todos los campos");
          return false;
        }        
        return new Promise(resolve=>{
          let task = {
            email_user:this.api.user.email,
            name:name.value,
            priority:priority.value,
            expiration:expiration.value
          }
          this.api.createTask(task).then(data=>{
            if(data && !data.error){
              Swal.fire("Tarea Creada");
              this.loadTaks();
              resolve(true);
            }else{
              Swal.fire("","La tarea no pudo ser creada","error");
              resolve(false);
            }
          });
        });
      }  
    });
  }
  async editTask(task){
    await Swal.fire({
      title:"Editar Tarea",
      html: 
        '<input id="swal-input1" placeholder="Nombre" type="text" value="'+ task.name +'" class="swal2-input">' +
        '<input id="swal-input2" placeholder="Fecha Vencimiento" type="date" value="'+ task.expiration +'" class="swal2-input">' + 
        '<select id="swal-input3" class="swal2-input" value="'+ task.priority +'"><option value="1">Prioridad Alta</option><option value="2">Prioridad Normal</option><option value="3">Prioridad Baja</option></select>',
      focusConfirm: false,
      showLoaderOnConfirm: true,
      showCancelButton: true,
      preConfirm: (dat) => {
        let name:any = document.getElementById('swal-input1');
        let expiration:any = document.getElementById('swal-input2');
        let priority:any =  document.getElementById('swal-input3');

        if(name.value == "" || expiration.value == ""){
          Swal.showValidationMessage("Debes llenar todos los campos");
          return false;
        }        
        return new Promise(resolve=>{
          let newtask = {
            id:task._id,
            name:name.value,
            priority:priority.value,
            expiration:expiration.value
          }
          this.api.editTask(newtask).then(data=>{
            if(data && !data.error){
              Swal.fire("Tarea Editada");
              this.loadTaks();
              resolve(true);
            }else{
              Swal.fire("","La tarea no pudo ser editada","error");
              resolve(false);
            }
          });
        });
      }  
    });
  }

  async deleteTask(task){
    await Swal.fire({
      title: 'Estas seguro?',
      text: "Deseas eliminar la tarea: " + task.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar la tarea!',
      showLoaderOnConfirm: true,
      preConfirm: (dat) => {
        console.log(dat);

        this.api.deleteTask({id:task._id}).then(data=>{
          if(data && !data.error){
            Swal.fire(
              'Borrada!',
              'La tarea ha sido borrada',
              'success'
            )
            this.loadTaks();
          }else{
            Swal.fire(
              'Error!',
              'La tarea no ha podido ser borrada',
              'error'
            )
          }
        });
      }
    })
  }
}
