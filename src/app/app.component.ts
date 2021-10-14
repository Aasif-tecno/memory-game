import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  livesLeft: number = 6;
  cardList = [
    {
      imgSrc: '../assets/images/beatles.jpeg',
      id: 1,
      name: 'beatles',
      selected: false,
    },
    {
      imgSrc: '../assets/images/blink182.jpeg',
      id: 2,
      name: 'blink 182',
      selected: false,
    },
    {
      imgSrc: '../assets/images/fkatwigs.jpeg',
      id: 3,
      name: 'fka twigs',
      selected: false,
    },
    {
      imgSrc: '../assets/images/fleetwood.jpeg',
      id: 4,
      name: 'fleetwood',
      selected: false,
    },
    {
      imgSrc: '../assets/images/joy-division.jpeg',
      id: 5,
      name: 'joy division',
      selected: false,
    },
    {
      imgSrc: '../assets/images/ledzep.jpeg',
      id: 6,
      name: 'led zeppelin',
      selected: false,
    },
    {
      imgSrc: '../assets/images/metallica.jpeg',
      id: 7,
      name: 'metallica',
      selected: false,
    },
    {
      imgSrc: '../assets/images/pinkfloyd.jpeg',
      id: 8,
      name: 'pink floyd',
      selected: false,
    },
    {
      imgSrc: '../assets/images/beatles.jpeg',
      id: 9,
      name: 'beatles',
      selected: false,
    },
    {
      imgSrc: '../assets/images/blink182.jpeg',
      id: 10,
      name: 'blink 182',
      selected: false,
    },
    {
      imgSrc: '../assets/images/fkatwigs.jpeg',
      id: 11,
      name: 'fka twigs',
      selected: false,
    },
    {
      imgSrc: '../assets/images/fleetwood.jpeg',
      id: 12,
      name: 'fleetwood',
      selected: false,
    },
    {
      imgSrc: '../assets/images/joy-division.jpeg',
      id: 13,
      name: 'joy division',
      selected: false,
    },
    {
      imgSrc: '../assets/images/ledzep.jpeg',
      id: 14,
      name: 'led zeppelin',
      selected: false,
    },
    {
      imgSrc: '../assets/images/metallica.jpeg',
      id: 15,
      name: 'metallica',
      selected: false,
    },
    {
      imgSrc: '../assets/images/pinkfloyd.jpeg',
      id: 16,
      name: 'pink floyd',
    },
  ];
  selectedCards: any = [];
  cardData: any;
  gameStarted = false;
  gamePaused = false;
  popup = false;
  peakCount = 2;
  modelTitle?: string;
  modelText?: string;
  timeLeft: number = 20;
  interval: any;

  title = 'memory-game';

  ngOnInit() {
    this.randomizeCard();
  }

  randomizeCard() {
    this.cardData = this.cardList.sort(() => Math.random() - 0.5);
  }

  startGame() {
    this.gameStarted = true;
    this.startTimer();
  }
  takeAPeak() {
    this.peakCount--;
    this.cardData?.forEach((card: any) => {
      if (!card.selected) {
        card.selected = true;
        setTimeout(() => {
          card.selected = false;
        }, 1000);
      }
    });
  }
  showModel(title: string, text: string){
    this.popup = true;
    this.modelTitle = title
    this.modelText = text
  }

  startTimer() {
    this.gamePaused = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 0;
        this.reset();
        this.showModel('Time out', 'Please restart the game again');
      }
    }, 1000);
  }

  pauseTimer() {
    this.gamePaused = true;
    clearInterval(this.interval);
  }

  cardClicked(card: any) {
    // if (this.timeLeft != 0){
    card.selected = true;
    this.selectedCards.push(card);
    this.checkCard();
    // }
  }
  checkCard() {
    if (this.selectedCards.length === 2) {
      if (this.selectedCards[0].name === this.selectedCards[1].name) {
        console.log('Matched');
      } else {
        this.livesLeft--;
        if (this.livesLeft === 0) {
          return this.reset();
        }
        console.log('Mismatch');
        this.selectedCards.forEach((card: any) => {
          setTimeout(() => (card.selected = false), 1000);
        });
      }
      if (this.livesLeft === 0){
        this.showModel('Game Over', 'Please restart the game again');
        this.reset();
      }
      this.selectedCards = [];
    }
  }

  reset() {
    this.cardData.map((card: any) => {
        card.selected = true;
    });
    clearInterval(this.interval);
    this.timeLeft = 20;
    this.gameStarted = false;
    this.gamePaused = false;
    this.selectedCards = [];
    this.livesLeft = 6;
    setTimeout(() => {
      this.cardData.map((card: any) => {
        card.selected = false;
      });
      this.randomizeCard();
    }, 1000);
  }
}
