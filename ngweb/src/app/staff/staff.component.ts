import { KeyDetail } from './../key/keyDetail';
import { NoteData } from './NoteData';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  public notes: NoteData[] = [];
  public lose: boolean = false;
  public totalKeys: number = 0;
  public stageInterval: any;
  public playing = false;
  public lifes: number = 5;
  public hearts: string = '❤❤❤❤❤';
  public newNotes: number[] = [];
  public currentStage = 0;
  public showNextStage = false;
  public respawnLifes = 5;
  private readonly stages = [
    {
      fn: () => this.randomWhites(),
      speed: 3000,
      quantity: 5,
      lifes: 5
    },
    {
      fn: () => this.randomWhites(),
      speed: 3000,
      quantity: 40,
      lifes: 3
    },
    {
      fn: () => this.randomWhites(),
      speed: 2000,
      quantity: 30,
      lifes: 3
    },
    {
      fn: () => this.randomWhites(),
      speed: 1200,
      quantity: 60,
      lifes: 2
    },
    {
      fn: () => this.randomWhitesExtended(),
      speed: 2400,
      quantity: 40,
      lifes: 4
    },
    {
      fn: () => this.randomWhitesExtended(),
      speed: 1800,
      quantity: 30,
      lifes: 3
    },
    {
      fn: () => this.randomWhitesExtended(),
      speed: 1200,
      quantity: 60,
      lifes: 2
    },
    {
      fn: () => this.randomBetween(60, 72),
      speed: 2100,
      quantity: 40,
      lifes: 5
    },
    {
      fn: () => this.randomBetween(60, 72),
      speed: 1800,
      quantity: 30,
      lifes: 3
    },
    {
      fn: () => this.randomBetween(60, 72),
      speed: 1200,
      quantity: 60,
      lifes: 2
    },
    {
      fn: () => this.randomBetween(56, 84),
      speed: 2800,
      quantity: 40,
      lifes: 3
    },
    {
      fn: () => this.randomBetween(56, 84),
      speed: 1800,
      quantity: 30,
      lifes: 3
    },
    {
      fn: () => this.randomBetween(56, 84),
      speed: 1000,
      quantity: 20,
      lifes: 2
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  private getStage(x: number) {
    return this.stages[x];
  }

  @HostListener('window:MidiKeyPress', ['$event'])
  handleKeyDown(event: any) {
    if(!this.playing) {
      return;
    }
    const kd = event.detail as KeyDetail;
    if(kd.pressure > 0) {
      if(kd.keyPressed == this.notes[0].keyValue) {
        this.notes[0].stop();
        this.notes.shift();
        this.totalKeys++;
        this.lifes = this.respawnLifes;
        this.checkWinStage();
      } else {
        this.lifes--;
        if(this.lifes <= 0) {
          this.onLose();
        }
      }
      this.calcHearts();
    }
  }

  checkWinStage() {
    if(this.notes.length == 0 && this.newNotes.length == 0) {
      this.currentStage++;
      if(this.currentStage < this.stages.length) {
        this.showNextStage = true;
      } else {
        alert('You win!');
      }
    }
  }

  next() {
    this.showNextStage = false;
    this.startStage(this.currentStage);
  }

  restart() {
    this.currentStage = 0;
    this.playing = true;
    this.totalKeys = 0;
    this.notes = [];
    this.startStage(0);
    this.lifes = 5;
    this.respawnLifes = 5;
    this.calcHearts();
    this.lose = false;
  }

  private calcHearts() {
    this.hearts = '';
    for(let x = 0; x<this.lifes; x++) {
      this.hearts += '❤';
    }
  }

  private startStage(stageX: number) {
    const stage = this.generateStage(stageX);
    this.newNotes = stage.notes;
    const speed = stage.speed;
    this.respawnLifes = stage.lifes;
    this.lifes = this.respawnLifes;
    this.stageInterval = setInterval( () => {
      this.notes.push(new NoteData(this.newNotes[0], speed, () => this.onLose()));
      this.newNotes.shift();
      if(this.newNotes.length == 0) {
        clearInterval(this.stageInterval);
      }
    }, 1000);
  }

  private onLose() {
    this.lose = true;
    clearInterval(this.stageInterval);
    this.notes.forEach(note => {
      note.stop();
    });
    this.playing = false;
  }

  private generateStage(x: number) {
    const stage = this.getStage(x);
    const notes = [];
    for(let x = 0; x<stage.quantity; x++) {
      notes.push(stage.fn())
    }
    return {
      notes,
      speed: stage.speed,
      lifes: stage.lifes
    }
  }



  randomBetween(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  randomWhites() {
    const whites = [
      60,
      62,
      64,
      65,
      67,
      69,
      71,
    ];
    return whites[this.randomBetween(0, whites.length-1)];
  }

  randomWhitesExtended() {
    const whites = [
      57,
      59,
      60,
      62,
      64,
      65,
      67,
      69,
      71,
      72,
      74,
      76,
      77,
      79,
      81,
      83,
      84
    ];
    return whites[this.randomBetween(0, whites.length-1)];
  }

}
