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
    
    this.letters = this.fullText.split('').map((char, index) => ({
      char,
      visible: false,
      loaderVisible: false,
      loader: this.loaders[index % this.loaders.length]
    }));

    
    setTimeout(() => {
      this.showLoader = false;
      this.displayLetters();
    }, 1000); 
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
        }, 300);
      }, 0); 
    }
  }
}
