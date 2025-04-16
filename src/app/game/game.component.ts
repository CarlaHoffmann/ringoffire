import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
// import { GamedataService } from '../gamedata.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  // gamedata = inject(GamedataService);
  game!: Game;

  constructor() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
