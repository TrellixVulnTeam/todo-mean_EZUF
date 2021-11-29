import { Component ,Input, OnDestroy, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {Task} from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{

  storedTasks:Task[]=[];
  totalTasks =0;
  pageSize = 10;
  pageSizeOptions=[1 ,5 , 10, 100];
  pageIndex=0;
  private authListenerSubscription!:Subscription;
  public userIsAuthenticated= false;
  userId=null;
  // create taskService
  constructor(public taskService:TaskService, private authService:AuthService){

  }

  private tasksSub!: Subscription;
  ngOnDestroy() {
    this.tasksSub.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }

  onDelete(task:Task){
      this.taskService.deleteTask(task._id).subscribe((resp)=>{
        console.log("deleted Successfully");

        this.taskService.getTasks(this.pageSize,this.pageIndex);
        alert("Deleted Successfully");

      },error=>{
        // alert("Deleted unSuccessfully");
      });

  }
  onChangePage(event:PageEvent){
    this.pageSize= event.pageSize;
    this.pageIndex=event.pageIndex;
    this.taskService.getTasks(this.pageSize,event.pageIndex) ;

  }
  isLoading = false;
  ngOnInit(){
   this.taskService.getTasks(this.pageSize,this.pageIndex) ;
   this.userId= this.authService.getUserId();
   this.authListenerSubscription= this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId= this.authService.getUserId();
    })
  this.userIsAuthenticated = this.authService.getAuthStatus();

  console.log("list,", this.userId);
    this.tasksSub= this.taskService.getTaskUpdateLister()
        .subscribe((tasksData:any) =>{
          this.isLoading = true;
            this.storedTasks= tasksData.tasks;
            this.totalTasks= tasksData.totalCount;
        });
  }


}
