import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from 'src/app/servicios/transferencia.service';
import { Transferencia } from 'src/app/modelos/transferencia.model';

@Component({
  selector: 'app-listar-transferencias',
  templateUrl: './listar-transferencias.component.html',
  styleUrls: ['./listar-transferencias.component.css']
})
export class ListarTransferenciasComponent implements OnInit {

  constructor(private transferenciaService: TransferenciaService) { }

  transferencias: Transferencia[];
  displayedColumns = ['nombre', 'rut', 'banco', 'tipo', 'monto'];

  ngOnInit(): void {
    this.transferenciaService.getAll().subscribe(transferencias => this.transferencias = transferencias);
  }

}
