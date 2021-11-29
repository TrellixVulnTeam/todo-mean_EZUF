import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit ,OnDestroy {
  private authListenerSubscription!:Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubscription= this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.isLoading = isAuthenticated;
      })
  }
  ngOnDestroy(){
    this.authListenerSubscription.unsubscribe();
  }
  isLoading = false;
  onSignup(form:NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading= true;
     const auth :AuthData={
      email : form.value.email,
      password : form.value.password
    }

    this.authService.createUser(auth)





  }
}
