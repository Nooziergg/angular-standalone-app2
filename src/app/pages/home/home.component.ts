import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [SharedModule,FormsModule]
})
export class HomeComponent {
  exibirTexto: string = '';
  vezesClicado: number = 0;
  regexTeste: string = '';
  regexPattern: string = '';
  regexResultado: string = '';



  modificarTexto() {
    this.vezesClicado++;
    this.exibirTexto = 'O botão foi clicado ' + this.vezesClicado + ' vez(es)';
  }

}
