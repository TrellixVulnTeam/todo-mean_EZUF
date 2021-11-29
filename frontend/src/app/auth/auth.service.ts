import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { AuthData } from "./auth-data.model";
const baseUrl = environment.API_BASE_URL+"users"
@Injectable({providedIn:'root'})
export class AuthService{
  private authStatusListener = new Subject<boolean>();
  private token!:string;
  private authStatus = false;
  private userId:any=null;
  tokenTimer:any;
  constructor(private http: HttpClient, private router: Router){

  }

  login(authData:AuthData){
    this.http.post<{status:{},data:{token:string,expiresIn:number,userId:string}}>(baseUrl+"/login",authData)
        .subscribe((resp)=>{
          // console.log(resp);
          this.token = resp.data.token;
          if(this.token){
            const expiresIn= resp.data.expiresIn;
            this.tokenTimer!=setTimeout(()=>{
              this.logout();
            },expiresIn*1000);
            this.userId= resp.data.userId;
            const now = new Date();
            const expirationDate = new Date(now.getTime()+expiresIn*1000);
            this.saveAuthData(this.token,expirationDate,this.userId);
            this.authStatusListener.next(true);
            this.authStatus =true;
            this.router.navigate(['/'])
          }
          // console.log(this.token);
        },error=>{
          console.log("login failed",error);
          this.authStatusListener.next(false);
        });
  }
  getToken(){
    return this.token;
  }
  getAuthStatus(){
    return this.authStatus;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getUserId(){
    return this.userId;
  }
  createUser(authData:AuthData){
       this.http.post(baseUrl+"/signup",authData).subscribe((resp)=>{
            console.log(resp);
            this.router.navigate(['/']);
          },(error)=>{
            console.log("signup failed",error);
            this.authStatusListener.next(false);
          });

  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(authInfo){
      const now = new Date();
      const expiresIn =authInfo.expirationDate.getTime()-now.getTime();
      if(expiresIn>0){
        this.token= authInfo.token;
        this.authStatus= true;
        this.tokenTimer!=setTimeout(()=>{
          this.logout();
        },expiresIn);
        this.authStatusListener.next(true);
      }


    }
  }

  logout(){
    this.token = '';
    this.authStatus=false;
    this.authStatusListener.next(false);
    this.userId= null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/'])
  }

  private saveAuthData(token:string, expirationDate:Date,userId: string){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("userId",userId)
  }
  private clearAuthData(){

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");


  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate:any = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(token){
      return {token:token, expirationDate:new Date(expirationDate),userId:userId}
    }
    return;
  }
}
