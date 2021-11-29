import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { createTaskComponent } from './Create/create.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    createTaskComponent,
    ListComponent,
  ],
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
})
export class TaskModule{}
