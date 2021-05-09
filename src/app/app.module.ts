import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarDestinatarioComponent } from './componentes/agregar-destinatario/agregar-destinatario.component';
import { ListarTransferenciasComponent } from './componentes/listar-transferencias/listar-transferencias.component';
import { TransferirComponent } from './componentes/transferir/transferir.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  


@NgModule({
  declarations: [
    AppComponent,
    AgregarDestinatarioComponent,
    ListarTransferenciasComponent,
    TransferirComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
