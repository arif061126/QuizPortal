import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import swal from "sweetalert";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
   username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    profileImage:''
  }

  constructor(private userService:UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    //alert("submit");
    if(this.user.username==null||this.user.username==""){
      //alert("User name is required!");
      this._snackBar.open("User name is required", "ok",{verticalPosition:'top'});
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        swal("Good job!", "User is registered!", "success");
      },
      error => {
        console.log(error);
        this._snackBar.open("Something went wrong!", "ok",{verticalPosition:'top'});

      }
    )

  }
}
