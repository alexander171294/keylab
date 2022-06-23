import { KeyDetail } from './../keyDetail';
import { Component, Input, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-octava',
  templateUrl: './octava.component.html',
  styleUrls: ['./octava.component.scss']
})
export class OctavaComponent implements OnInit {

  @Input() cstart: number = 0;

  pressed: {[key: number]: boolean} = {};

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:MidiKeyPress', ['$event'])
  handleKeyDown(event: any) {
    const kd = event.detail as KeyDetail;
    if(kd.keyPressed >= this.cstart && kd.keyPressed <= this.cstart+12) {
      if(kd.pressure > 0) {
        this.pressed[kd.keyPressed] = true;
      } else {
        this.pressed[kd.keyPressed] = false;
      }
    }
  }

}
