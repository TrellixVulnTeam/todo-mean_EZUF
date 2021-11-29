import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { createTaskComponent } from './Tasks/Create/create.component';
import { ListComponent } from './Tasks/list/list.component';

const routes: Routes = [
  {path:'',component: ListComponent},
  {path :'create' ,component:createTaskComponent,canActivate:[AuthGuard]},
  {path:'edit/:taskId',component:createTaskComponent,canActivate:[AuthGuard]},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
