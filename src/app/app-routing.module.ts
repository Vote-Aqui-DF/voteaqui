import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'resultado/:votacaoId',
    loadChildren: () => import('./resultado/resultado.module').then(m => m.ResultadoModule)
  },
  {
    path: ':id/:votacao',
    loadChildren: () => import('./cedula/cedula.module').then(m => m.CedulaModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./painel/painel.module').then(m => m.PainelModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
