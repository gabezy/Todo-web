import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgbTooltip
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  constructor(private readonly authService: AuthService, private readonly elRef: ElementRef) { }

  logout(): void {
    this.authService.logout();
  }

}
