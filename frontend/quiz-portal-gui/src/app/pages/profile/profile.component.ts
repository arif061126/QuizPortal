import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user=null;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    //get user from session data / local storage:
    //this.user = this.loginService.getUserDetail();

    //get user from server:
    this.loginService.getCurrentUser().subscribe(
      user=>{
        this.user=user;
      },
      error => {
        console.log(error);
      }
    )
  }

}
