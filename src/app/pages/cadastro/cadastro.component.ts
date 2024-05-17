import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cadastro } from '../../models/cadastro';
import { SharedModule } from '../../shared/shared.module';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [SharedModule,NgxMaskDirective]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cadastro: Cadastro }
  ) {
    this.cadastroForm = this.fb.group({
      id: [data.cadastro ? data.cadastro.id : null],
      nome: [data.cadastro ? data.cadastro.nome : '', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur'
      }],
      email: [data.cadastro ? data.cadastro.email : '', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }],
      senha: [data.cadastro ? data.cadastro.senha : '', {
        validators: [Validators.required, this.passwordStrengthValidator()],
        updateOn: 'blur'
      }],
      cpf: [data.cadastro ? data.cadastro.cpf : '', {
        validators: [Validators.required, this.cpfValidator()],
        updateOn: 'blur'
      }]
    });

  }

  passwordStrengthValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (!value) return null;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  cpfValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      console.log(value);
      const valid = /^\d{11}|\d{14}$/.test(value);
      return !valid ? { cpfInvalid: true } : null;
    };
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.dialogRef.close(this.cadastroForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


// O que é AbstractControl?
// AbstractControl é uma classe abstrata que define um conjunto de métodos e propriedades comuns a todos os controles de formulário no Angular.
// Ele é a classe base para as classes FormControl, FormGroup e FormArray, que são usadas para criar controles de formulário em um aplicativo Angular.

//Por que usar AbstractControl?
//AbstractControl é útil porque fornece uma interface comum para todos os controles de formulário no Angular.
//Isso significa que você pode usar os mesmos métodos e propriedades para interagir com diferentes tipos de controles de formulário, independentemente de como eles são implementados.
//Por exemplo, você pode usar o método setValue() para definir o valor de um controle de formulário, independentemente de ser um FormControl, FormGroup ou FormArray.

//Como funciona Inject aqui?
//O decorador @Inject é usado para injetar uma dependência em um componente, serviço ou diretiva Angular.
//Ele permite que você injete uma instância de um serviço ou outro objeto em um componente ou serviço Angular.
//O @Inject é usado em conjunto com o decorador @Injectable para fornecer dependências para um componente ou serviço Angular.
