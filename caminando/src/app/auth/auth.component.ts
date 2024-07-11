import { Component, OnInit } from '@angular/core';
import { infinity, helix, ring, bouncy, waveform, square, reuleaux, tailChase, dotSpinner, spiral } from 'ldrs';

infinity.register();
helix.register();
ring.register();
bouncy.register();
waveform.register();
square.register();
reuleaux.register();
tailChase.register();
dotSpinner.register();
spiral.register();

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  title = 'Caminando Animation';
  showLoader: boolean = true;
  showLetters: boolean = false;
  letters: {char: string, loader: string, visible: boolean}[] = [];
  fullText: string = 'Caminando';
  loaders: string[] = ['helix', 'ring', 'bouncy', 'waveform', 'square', 'reuleaux', 'tail-chase', 'dot-spinner', 'spiral'];
  currentLetterIndex: number = 0;

  ngOnInit() {
    this.letters = this.fullText.split('').map((char, index) => ({ char, loader: this.loaders[index] || 'ring', visible: false }));
    setTimeout(() => {
      this.showLoader = false;
      this.showLetters = true;
      this.displayLetters();
    }, 2000); // 2000 ms = 2 seconds
  }

  displayLetters() {
    if (this.currentLetterIndex < this.letters.length) {
      this.letters[this.currentLetterIndex].visible = true;
      this.currentLetterIndex++;
      setTimeout(() => {
        this.displayLetters();
      }, 3000); // 3000 ms = 3 seconds
    }
  }
}
