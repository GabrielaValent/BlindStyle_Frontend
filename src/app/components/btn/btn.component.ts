import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextToSpeechService } from './../../services/text-speech/text-to-speech.service';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {

  @Input() label: string = ''
  @Input() from: string = ''
  @Input() hist: string = ''

  constructor(
    private router: Router,
    private ttsService: TextToSpeechService,
  ) {}

  goTo(){
    if(this.label=='Histórico')
    this.router.navigate(['/historico']);
    if(this.label=='Câmera')
    this.router.navigate(['/camera']);
    if(this.label=='Galeria')
      this.router.navigate(['/galeria']);
  }

  onSpeak(text: string): void {
    this.ttsService.speak(text);
  }

}
