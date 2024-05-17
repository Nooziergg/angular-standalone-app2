import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-regex-examples',
  templateUrl: './regex-examples.component.html',
  styleUrls: ['./regex-examples.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class RegexExamplesComponent {
  regexForm: FormGroup;
  matchResult: string = '';
  regexExamples: SafeHtml;
  regexComponents: SafeHtml;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.regexForm = this.fb.group({
      text: ['', [Validators.required]],
      regex: ['', [Validators.required]]
    });
    this.regexComponents = this.sanitizer.bypassSecurityTrustHtml(`
    <ul>
      <li><strong>.</strong> - Qualquer caractere, exceto nova linha.</li>
      <li><strong>\\d</strong> - Qualquer dígito (0-9).</li>
      <li><strong>\\D</strong> - Qualquer caractere que não seja dígito.</li>
      <li><strong>\\w</strong> - Qualquer caractere de palavra (letras, dígitos, sublinhado).</li>
      <li><strong>\\W</strong> - Qualquer caractere que não seja de palavra.</li>
      <li><strong>\\s</strong> - Qualquer caractere de espaço em branco (espaço, tab, nova linha).</li>
      <li><strong>\\S</strong> - Qualquer caractere que não seja espaço em branco.</li>
      <li><strong>^</strong> - Início da linha.</li>
      <li><strong>$</strong> - Fim da linha.</li>
      <li><strong>[abc]</strong> - Qualquer caractere dentro dos colchetes (a, b, ou c).</li>
      <li><strong>[^abc]</strong> - Qualquer caractere exceto aqueles dentro dos colchetes (não a, b, ou c).</li>
      <li><strong>a|b</strong> - a ou b.</li>
      <li><strong>a*</strong> - Zero ou mais ocorrências de a.</li>
      <li><strong>a+</strong> - Uma ou mais ocorrências de a.</li>
      <li><strong>a?</strong> - Zero ou uma ocorrência de a.</li>
      <li><strong>a{3}</strong> - Exatamente 3 ocorrências de a.</li>
      <li><strong>a{3,}</strong> - 3 ou mais ocorrências de a.</li>
      <li><strong>a{3,5}</strong> - Entre 3 e 5 ocorrências de a.</li>
    </ul>
  `);

    this.regexExamples = this.sanitizer.bypassSecurityTrustHtml(`
    <ul>
      <li><strong>^\\d{4}$</strong> - Correspondência exata de um número de 4 dígitos.</li>
      <li><strong>^[a-zA-Z]+$</strong> - Apenas letras maiúsculas e minúsculas.</li>
      <li><strong>^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$</strong> - Validação de e-mail simples.</li>
    </ul>
  `);
  }

  testRegex() {
    const { text, regex } = this.regexForm.value;
    try {
      const pattern = new RegExp(regex);
      console.log(pattern);
      console.log(text);
      this.matchResult = text.match(pattern) ? 'O texto corresponde ao padrão!' : 'O texto não corresponde ao padrão.';
    } catch (e) {
      this.matchResult = 'Expressão regular inválida.';
    }
  }
}
