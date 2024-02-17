import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from 'src/app/modules/auth/pages/sign-up/sign-up.component';
import { NavigationComponent } from './modules/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SignUpComponent, NavigationComponent],
})
export class AppComponent {}
