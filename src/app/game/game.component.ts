import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
// import { GamedataService } from '../gamedata.service';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, GameInfoComponent, MatButtonModule, 
    MatIconModule, MatDialogModule, DialogAddPlayerComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  // gamedata = inject(GamedataService);
  currentCard: string = '';
  game!: Game;

  constructor(public dialog: MatDialog) {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    // console.log(this.game);
  }

  takeCard() {
    if(!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || ''; // pop() nimmt den letzten Wert im Array
      this.pickCardAnimation = true;
      console.log('New card:' + this.currentCard);
      console.log('Game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // Rest-Opperator: 3/3 = 1 Rest 0;
      setTimeout(()=>{
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent
    //   , {
    //   data: {name: this.name, animal: this.animal},
    // }
  );

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
