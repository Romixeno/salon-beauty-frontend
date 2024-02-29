import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { userType } from '../../Models/userType.type';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { httpUrl } from '../../utils/utils';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeadersComponent implements OnInit {
  baseUrl: string;
  router: Router = inject(Router);
  isLoggedIn: boolean = false;
  userType?: userType;
  user;
  private subLoggedIn: Subscription;
  private subUserType: Subscription;
  showDropdown: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.baseUrl = httpUrl;
    this.authService.isAuthenticated();
    this.subLoggedIn = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.user = this.authService.getUser();
    });
    this.subUserType = this.authService.userType$.subscribe((userType) => {
      this.userType = userType;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subLoggedIn) {
      this.subLoggedIn.unsubscribe();
    }
    if (this.subUserType) {
      this.subUserType.unsubscribe();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onLogout() {
    // this.authService.logout().subscribe(() => {
    //   this.user = null;
    // });
    this.authService.logoutUser().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.showDropdown = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onEmployeeLogout() {
    this.authService.logoutEmployee().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.showDropdown = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
