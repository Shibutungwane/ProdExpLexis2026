import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Heading',
  templateUrl: './Heading.component.html',
  styleUrls: ['./Heading.component.css']
})
export class HeadingComponent implements OnInit {

 @Input() title!: string;
 @Input() subheading?:string
 
  constructor() { }

  ngOnInit() {
  }

}
