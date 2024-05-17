import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
