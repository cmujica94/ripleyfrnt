import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarDestinatarioComponent } from './componentes/agregar-destinatario/agregar-destinatario.component';
import { ListarTransferenciasComponent } from './componentes/listar-transferencias/listar-transferencias.component';
import { TransferirComponent } from './componentes/transferir/transferir.component';

const routes: Routes = [
  { path: '', redirectTo: 'listaTransferencias', pathMatch: 'full' },
  { path: 'listaTransferencias', component: ListarTransferenciasComponent },
  { path: 'transferir', component: TransferirComponent },
  { path: 'agregarDestinatario', component: AgregarDestinatarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
