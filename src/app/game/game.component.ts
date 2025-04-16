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
  currentCard: string = '';
  game!: Game;

  constructor() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || ''; // pop() nimmt den letzten Wert im Array
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(()=>{
        this.pickCardAnimation = false;
      }, 1500)
    }
  }
}
