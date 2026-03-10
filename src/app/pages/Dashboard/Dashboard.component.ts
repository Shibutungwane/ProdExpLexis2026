import { Component, inject, OnInit } from '@angular/core';
import { StatCardComponent } from "./stats/stats.component";
import { LucideAngularModule,ShieldCheck} from 'lucide-angular';
import { HeadingComponent } from 'app/components/Heading/Heading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
  imports: [StatCardComponent,LucideAngularModule,HeadingComponent,]
  
})
export class DashboardComponent implements OnInit {
  icons = { ShieldCheck};
   router = inject(Router);
  constructor() { }

avatars: string[] = [
  
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64',
 
  ];
  logout() {
  localStorage.removeItem('accessToken');
  this.router.navigate(['/login']);
}
  ngOnInit() {
  }

}
