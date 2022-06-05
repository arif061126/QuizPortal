import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {AdminDashboardComponent} from "./pages/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "./pages/user-dashboard/user-dashboard.component";
import {AdminGuard} from "./services/admin.guard";
import {NormalGuard} from "./services/normal.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch:'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'welcome',
        component:WelcomeComponent,
        pathMatch:'full'
      },
      {
        path:'profile',
        component:ProfileComponent,
        pathMatch:'full'
      }
    ]

  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
