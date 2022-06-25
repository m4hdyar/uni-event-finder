import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'admin-panel', component: AdminPanelComponent},
  { path: 'login', component:LoginComponent, pathMatch: 'full' },
  { path: '**', component:HomePageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
