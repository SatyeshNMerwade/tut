import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CreativeViewComponent } from './creative-view/creative-view.component';
import { CreativeEditComponent } from './creative-edit/creative-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
  { path: 'creatives', component: CreativeViewComponent, canActivate: [AuthGuardService] },
  { path: 'creatives/:id', component: CreativeEditComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    //{ enableTracing: true }, // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
