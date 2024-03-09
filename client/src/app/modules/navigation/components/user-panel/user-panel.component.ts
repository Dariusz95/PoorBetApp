import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent {
  constructor(private _authService: AuthService) {}

  isAuthenticated = computed(() => {
    return this._authService.loggedIn() ? true : false;
  });
}
