import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {RegistryComponent} from "./features/auth/registry/registry.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: '', redirectTo: '/login', pathMatch: "full" }
];
