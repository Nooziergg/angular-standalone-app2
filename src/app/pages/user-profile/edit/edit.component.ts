import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  user: User | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.editForm.patchValue({
        nome: this.user.name,
        email: this.user.email
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedUser = { ...this.user, ...this.editForm.value } as User;
      this.authService.updateCurrentUser(updatedUser);
      console.log('Perfil atualizado', updatedUser);
    }
  }
}
