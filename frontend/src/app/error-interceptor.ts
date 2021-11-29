import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public dialog:MatDialog){}
  intercept(req:HttpRequest<any>,next:HttpHandler){
    return next.handle(req).pipe(
      catchError((err:HttpErrorResponse) =>{
        console.log("error interceptor",err);
        let errorMessage='unknown error';
        errorMessage= err.error.status.message;
        this.dialog.open(ErrorComponent,{data:{message:errorMessage}});
        return throwError(err);
      })
    );
  }
}
