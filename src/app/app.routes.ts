import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {RegistryComponent} from "./features/auth/registry/registry.component";
import {authGuard} from "./core/services/auth.guard";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {TodoComponent} from "./features/todo/todo.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: '', component: MainLayoutComponent, canActivate: [authGuard],
    children: [
      {path: '', redirectTo: '/tasks', pathMatch: "full"},
      {path: 'tasks', component: TodoComponent}
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: "full" }
];
