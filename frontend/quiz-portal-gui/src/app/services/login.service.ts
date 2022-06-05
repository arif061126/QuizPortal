import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginSubjectStatus = new Subject<boolean>();

  baseURL="http://localhost:5555";

  constructor(private httpClient:HttpClient, private router: Router) { }

  //get current user
  public getCurrentUser(){
    return this.httpClient.get(`${this.baseURL}/current-user`);
  }

  public generateToken(loginData:any){
    return this.httpClient.post(`${this.baseURL}/token`,loginData);
  }

  //login user: set token in local storage
  public storeToken(token:any){
    localStorage.setItem("token", token);
    return true;
  }

  //check user is logged in or not
  public checkLoggedInUser(){
    let token = localStorage.getItem("token");

    if(token==undefined || token=="" || token==null){
      return false;
    }else {
      return true;
    }
    //(token == undefined || token == "" || token == null) ? false : true;
  }

  //logout: remove token from local storage
  public checkLogoutUser(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //getToken
  public getToken(){
    return localStorage.getItem("token");
  }

  //set user detail
  public setUserDetail(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get User Detail
  public getUserDetail(){
    let user = localStorage.getItem("user");

    if(user!=null){
      return JSON.parse(user);
    }else {
      this.checkLogoutUser();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUserDetail();

    return user.authorities[0].authority;
    //return user.authorities;
  }

}
