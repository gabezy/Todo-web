import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CreateUserDTO} from "../../../core/dtos/user.dto";
import {UserService} from "../../../core/services/user.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registry',
  standalone: true,
  imports: [ FormsModule,  NgIf ],
  providers: [ UserService ],
  templateUrl: './registry.component.html',
  styleUrl: './registry.component.sass'
})
export class RegistryComponent {

  createUser: CreateUserDTO = {
    email: '',
    password: '',
  }

  errorMessage = '';

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  onSubmit() {
    this.userService.createUser(this.createUser).subscribe({
      complete: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = err.error.description
    })
  }

}
