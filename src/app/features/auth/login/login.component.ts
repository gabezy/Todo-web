import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LoginDTO} from "../../../core/dtos/login.dto";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent, NgIf, RouterLink],
  providers: [ AuthService ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login: LoginDTO = {
    email: '',
    password: ''
  }

  errorMessage: string = '';

  onSubmit() {
    this.authService.login(this.login).subscribe({
      next: (auth) => {
        this.authService.storeToken(auth.token);
        this.router.navigate(['']);
      },
      error: e => this.errorMessage = e.error?.description || "It was not possible to log in. Try again later"
    })
  }

}
