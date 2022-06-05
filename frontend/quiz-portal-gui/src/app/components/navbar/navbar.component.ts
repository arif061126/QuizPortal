import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin:any=false;
  user:any=null;

  constructor(public loginService: LoginService, private router:Router) { }

  ngOnInit() {
    this.isLoggedin = this.loginService.checkLoggedInUser();
    this.user = this.loginService.getUserDetail();

    this.loginService.loginSubjectStatus.asObservable().subscribe(
      data=>{
        this.isLoggedin = this.loginService.checkLoggedInUser();
        this.user = this.loginService.getUserDetail();
      }
    )
  }

  logout() {
    this.loginService.checkLogoutUser();
    //this.loginService.loginSubjectStatus.next(false);

    //this.isLoggedin=false;
    //this.user=null;
    window.location.reload();

    //this.router.navigate(['logout']);
  }
}
