import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() percentage!: string;
  @Input() trend!: 'up' | 'down';
  @Input() subtext!: string;
  @Input() variant: 'orange' | 'dark' | 'white' = 'white';
  @Input() data: { value: number }[] = [];
  @Input() className: string = '';

  get currentStyle() {
    const configs = {
      orange: { bg: 'bg-red-600', text: 'text-white', subtext: 'text-orange-100', badge: 'bg-black text-white', chartColor: '#FFFFFF' },
      dark: { bg: 'bg-[#1C1C2E]', text: 'text-white', subtext: 'text-gray-400', badge: 'bg-red-600 text-white', chartColor: '#FFFFFF' },
      white: { bg: 'bg-white', text: 'text-[#1C1C2E]', subtext: 'text-gray-500', badge: 'bg-[#1C1C2E] text-white', chartColor: '#F97316' },
    };
    return configs[this.variant];
  }

  @HostBinding('class') get hostClasses() {
    const base =
      'relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 duration-150 shadow-sm transition-transform hover:scale-[1.02]';
    return `${base} ${this.currentStyle.bg} ${this.className}`;
  }

}
