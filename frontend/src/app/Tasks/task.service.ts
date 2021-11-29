import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Task } from "./task.model"
const  baseUrl = environment.API_BASE_URL+"tasks/";
@Injectable({providedIn:"root"})    // root - accessible to all

export class TaskService{
    private tasks :Task[]=[];
    private tasksUpdated =new Subject<{tasks:Task[],totalCount:number}>();
    // http used for api request
    // router - used to navigate between pages
    constructor(private http:HttpClient , private router:Router){

    }
    getTasks(taskPerPage?:number,currentPage?:any){
      let url ="http://localhost:3000/api/tasks"
      if(taskPerPage&& currentPage > -1){
        url += `?pagesize=${taskPerPage}&currentpage=${currentPage}`;
      }

      this.http.get<{status:{},data:Task[],totalCount:number}>(url)
          .subscribe((tasksData)=>{
            this.tasks= tasksData.data;
            this.tasksUpdated.next({tasks:[...this.tasks],totalCount:tasksData.totalCount});
            console.log("tasks", tasksData.data);
          })
    }
    // return task by id
    getTask(id:string){
        return this.http.get<{status:{},data:Task}>(baseUrl+id);
    }
    getTaskUpdateLister(){
      return this.tasksUpdated.asObservable();
    }
    // add task
    addTask(task:Task,image :File) {
      const taskData = new FormData();
      taskData.append("title",task.title);
      taskData.append("description",task.description);
      taskData.append("image",image,task.title);
      console.log(taskData);
      this.http.post<{status:{},data:Task}>(baseUrl,taskData)
          .subscribe((resp)=>{
            // console.log(resp);
            this.router.navigate(['/']);
            alert("Task added Successfully");
          },err=>{
            console.log(err);
            // alert(err);
          })

    }

    deleteTask(id?:string){
        return this.http.delete(baseUrl+id)
    }

    updateTask(task:Task){
      let taskData=null;
      if(typeof(task.imagePath)== 'string'){
          taskData = task;
      }else{
         taskData = new FormData();
        taskData.append("_id",task._id);
        taskData.append("description",task.description);
        taskData.append("image",task.imagePath,task.title);
      }
      this.http.put<{status:{},task:Task}>(baseUrl+task._id,taskData)
      .subscribe((resp)=>{
        console.log("updated Successfully");

        this.router.navigate(['/']);
        alert("Updated Successfully");

      },err=>{
        // alert(err);
      });
    }
}
