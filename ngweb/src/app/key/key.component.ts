import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:MidiKeyPress', ['$event'])
  handleKeyDown(event: any) {
    console.warn(event);
    alert(event.detail)
  }

}
