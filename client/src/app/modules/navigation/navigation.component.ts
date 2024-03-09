import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { authenticatedUserMenu, menu, notAuthenticatedUserMenu } from './data/menu';
import { Observable, map } from 'rxjs';
import { AuthService } from '@auth/service/auth.service';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule,
    UserPanelComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isMobile = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}

  menuElements = menu

  // menuElements = computed(() => {
  //   if (this.authService.loggedIn()) {
  //     return authenticatedUserMenu;
  //   } else {
  //     return notAuthenticatedUserMenu;
  //   }
  // });

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .subscribe((screenSize) => {
        if (screenSize.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
}
