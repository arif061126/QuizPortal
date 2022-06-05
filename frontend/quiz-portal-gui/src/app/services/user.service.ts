import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL="http://localhost:5555/user";

  constructor(private httpClient:HttpClient) { }

  public addUser(user:any){
    return this.httpClient.post(`${this.baseURL}/`,user);
  }

}
