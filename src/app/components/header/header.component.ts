import { Component, inject, signal } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import {
  LucideAngularModule,
  Menu,
  Search,
  Moon,
  Bell,
  ChevronDown
} from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule,],
  templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  icons = {

  Menu,
  Search,
  Moon,
  Bell,
  ChevronDown
  }

private authService =inject(AuthService)


}
