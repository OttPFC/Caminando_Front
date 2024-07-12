import { Component, OnInit } from '@angular/core';

import 'ldrs/ring'
import 'ldrs/trefoil'
import 'ldrs/trio'
import 'ldrs/helix'
import 'ldrs/quantum'
import 'ldrs/miyagi'
import 'ldrs/spiral'

import 'ldrs/waveform'
import 'ldrs/hatch'
import 'ldrs/grid'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showLoader: boolean = true;
  letters: { char: string, visible: boolean, loaderVisible: boolean, loader: string }[] = [];
  fullText: string = 'Caminando';
  loaders: string[] = ['helix', 'ring', 'quantum', 'miyagi', 'spiral', 'waveform', 'hatch', 'grid'];
  currentLetterIndex: number = 0;

  ngOnInit() {
    // Crea un array di lettere con visibilità iniziale impostata su false e assegna un loader
    this.letters = this.fullText.split('').map((char, index) => ({
      char,
      visible: false,
      loaderVisible: false,
      loader: this.loaders[index % this.loaders.length]
    }));

    // Imposta un timer per nascondere il loader iniziale dopo 2 secondi e iniziare a mostrare le lettere
    setTimeout(() => {
      this.showLoader = false;
      this.displayLetters();
    }, 1000); // 2000 ms = 2 seconds
  }

  displayLetters() {
    if (this.currentLetterIndex < this.letters.length) {
      this.letters[this.currentLetterIndex].loaderVisible = true;
      setTimeout(() => {
        this.letters[this.currentLetterIndex].loaderVisible = false;
        this.letters[this.currentLetterIndex].visible = true;
        this.currentLetterIndex++;
        setTimeout(() => {
          this.displayLetters();
        }, 300); // 500 ms per lettera
      }, 0); // 1000 ms = 1 second for loader
    }
  }
}
