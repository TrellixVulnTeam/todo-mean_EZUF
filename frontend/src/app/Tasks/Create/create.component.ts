import { Component, OnInit} from "@angular/core";
import { Task } from "../task.model";
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { TaskService } from "../task.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { imageTypeValidator } from "./image-type.validator";
import { AuthService } from "src/app/auth/auth.service";
@Component({
    selector:'create-task',
    templateUrl:'./create.component.html',
    styleUrls:['./create.component.scss']
})
export class createTaskComponent implements OnInit{
    task !: Task;
    mode ='create';
    private taskId:any= null;
    isLoading = false;
    taskForm!: FormGroup;
    imagePreview:any=null;
    userId:any=null;
    constructor(public taskService:TaskService ,public route:ActivatedRoute,private authService:AuthService){

    }
    ngOnInit(){
      this.userId= this.authService.getUserId();
      this.route.paramMap.subscribe((paramMap:ParamMap)=>{

          if(paramMap.has('taskId')){
            this.taskForm= new FormGroup(
              {'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(5)]}),
              'description': new FormControl(null,{validators:[Validators.required ]}),
              'image': new FormControl(null,{validators:[Validators.required]})
            });
              this.mode ='edit';
              this.taskId = paramMap.get('taskId');
              this.isLoading= true;
              this.taskService.getTask(this.taskId)
              .subscribe((resp) => {
                this.isLoading= false;
                this.task = resp.data
                this.taskForm.setValue({
                  'title':this.task.title,
                  'description':this.task.description,
                  'image':this.task.imagePath,
                })
              });
          }else{
            this.taskForm= new FormGroup({
              'title': new FormControl(null,{validators:[
                Validators.required,Validators.minLength(5)
              ]}),
              'description': new FormControl(null,{validators:[
                Validators.required
              ]}),
              'image': new FormControl(null,{validators:[
                Validators.required,
                imageTypeValidator
              ]})
            });
            this.mode ='create';
            this.taskId = null;
          }
      })
    }
    imageToDataUrl(file:File){
        const reader= new FileReader();
        reader.onload=()=>{
          this.imagePreview = reader.result;
        }
        reader.readAsDataURL(file);
    }
    onImagePicked(event:Event){

      const target= (event.target as HTMLInputElement).files;
      const file: File = (target as FileList)[0];
      this.taskForm.patchValue({'image':file});
      this.taskForm.get('image')?.updateValueAndValidity();
      this.imageToDataUrl(file);

    }



    onSaveTask() {
      if(!this.taskForm.valid){
        return;
      }
        const task :Task={
          // _id = this.taskId
          _id:'',
          title:this.taskForm.value.title,
          description: this.taskForm.value.description,
          imagePath:this.taskForm.value.image,
          creator:this.userId,
        };
        if(this.mode== 'edit'){
          task._id= this.task._id;
          this.taskService.updateTask(task);
        }else{
          this.taskService.addTask(task,this.taskForm.value.image);

        }
        this.taskForm.reset();
      }



}
