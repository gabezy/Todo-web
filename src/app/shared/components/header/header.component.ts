import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";

// @ts-ignore
import Tooltip from 'bootstrap/js/dist/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent implements OnInit{

  constructor(private readonly authService: AuthService, private readonly elRef: ElementRef) { }

  ngOnInit() {
    const tooltips = Array.from(this.elRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.forEach(tooltips => new Tooltip(tooltips))
  }

  logout(): void {
    this.authService.logout();
  }

}
