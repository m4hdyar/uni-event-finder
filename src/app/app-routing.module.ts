import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  
  { path: 'login', component:LoginComponent, pathMatch: 'full' },
  { path: '**', component:HomePageComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
