import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './seguranca/auth.guard';
import { CadastroPageComponent } from './pages/cadastro-page/cadastro-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserViewComponent } from './pages/user-profile/view/view.component';
import { UserEditComponent } from './pages/user-profile/edit/edit.component';
import { RegexExamplesComponent } from './pages/regex-examples/regex-examples.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cadastro', component: CadastroPageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
    children: [
      { path: 'view', component: UserViewComponent },
      { path: 'edit', component: UserEditComponent }
    ]
  },
  { path: 'regex-examples', component: RegexExamplesComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
