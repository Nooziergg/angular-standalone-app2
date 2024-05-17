import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Cadastro } from '../../models/cadastro';
import { MatDialog } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-cadastro-page',
  templateUrl: './cadastro-page.component.html',
  styleUrls: ['./cadastro-page.component.scss'],
  standalone: true,
  imports: [SharedModule, CadastroComponent]
})
export class CadastroPageComponent implements OnInit {
  cadastros$!: Observable<Cadastro[]>;
  private storageKey = 'cadastros';

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cadastros$ = this.apiService.getItems<Cadastro>(this.storageKey);
  }

  addCadastro(): void {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '400px',
      data: { cadastro: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.addItem<Cadastro>(this.storageKey, result).subscribe(() => {
          this.cadastros$ = this.apiService.getItems<Cadastro>(this.storageKey);
        });
      }
    });
  }

  editCadastro(cadastro: Cadastro): void {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '400px',
      data: { cadastro }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.updateItem<Cadastro>(this.storageKey, result).subscribe(() => {
          this.cadastros$ = this.apiService.getItems<Cadastro>(this.storageKey);
        });
      }
    });
  }

  deleteCadastro(id: number): void {
    this.apiService.deleteItem<Cadastro>(this.storageKey, id).subscribe(() => {
      this.cadastros$ = this.apiService.getItems<Cadastro>(this.storageKey);
    });
  }
}
