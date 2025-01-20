import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {RegistryComponent} from "./features/auth/registry/registry.component";
import {authGuard} from "./core/services/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'home', component: RegistryComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: "full" }
];
