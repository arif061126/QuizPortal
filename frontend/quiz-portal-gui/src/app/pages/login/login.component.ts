import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:"",
    password:""
  }

  constructor(private _snackBar: MatSnackBar,
              private loginService:LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.loginData.username.trim()=="" || this.loginData.username.trim()==null){
      this._snackBar.open("User name can not be empty!",
        "ok",{verticalPosition:'top'});
      return;
    }

    if(this.loginData.password.trim()=="" || this.loginData.password.trim()==null){
      this._snackBar.open("Password can not be empty!",
        "ok",{verticalPosition:'top'});
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);

        //login and store token:
        this.loginService.storeToken(data.token);

        //find which user is logged in:
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUserDetail(user);
            console.log(user);

            if(this.loginService.getUserRole()=="ADMIN"){
              //redirect: ADMIN-> admin dashboard
              //window.location.href="/admin-dashboard";
              this.router.navigate(["admin-dashboard"]);
              this.loginService.loginSubjectStatus.next(true);
            }else if(this.loginService.getUserRole()=="NORMAL"){
              //redirect: NORMAL-> normal dashboard
              this.router.navigate(["user-dashboard"]);
              this.loginService.loginSubjectStatus.next(true);
            }else{
              this.loginService.checkLogoutUser();
            }
          }
        )


      },
      error => {
        console.log(error);
        this._snackBar.open("Invalid details! Try again.", "ok",
          {duration:3000, verticalPosition:"top"});
      }
    );

  }
}
