import { Component, OnInit } from '@angular/core';
import { Destinatario } from 'src/app/modelos/destinatario.model';
import { DestinatarioService } from 'src/app/servicios/destinatario.service';
import { TransferenciaService } from 'src/app/servicios/transferencia.service';
import { Transferencia } from 'src/app/modelos/transferencia.model';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

  destinatario: Destinatario = {
    rut: '',
    nombre: '',
    correo: '',
    telefono: null,
    banco: '',
    tipoCuenta: '',
    numeroCuenta: null
  };

  transferencia: Transferencia = {
    nombre: '',
    rut: '',
    banco: '',
    tipo: '',
    monto: null
  }

  destinatarios: Destinatario[];
  destinatariosFiltrados: Destinatario[];
  matches = 0;
  seleccionado: boolean;
  montoTransferencia: number;

  submitted = false;

  constructor(private destinatarioService: DestinatarioService, private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    //obtener destinatarios
    this.getDestinatarios();
  }

  getDestinatarios(): void {
    this.destinatarioService.getAll().subscribe(destinatarios => this.destinatarios = destinatarios);
  }

  buscarDestinatario(nombreDestinatario: string): void {
    this.matches = 0;
    this.destinatariosFiltrados = [];
    this.destinatarios.forEach(destinatario => {
      if (destinatario.nombre.toLowerCase().includes(nombreDestinatario.toLowerCase()) && destinatario.nombre.length > 0) {
        this.destinatariosFiltrados.push(destinatario);
        this.matches++;
      } else {
      }
    });
  }

  seleccionarDestinatario(destinatario: Destinatario) {
    this.destinatario = destinatario;
    this.seleccionado = true;

    this.transferencia.nombre = this.destinatario.nombre;
    this.transferencia.rut = this.destinatario.rut;
    this.transferencia.banco = this.destinatario.banco;
    this.transferencia.tipo = this.destinatario.tipoCuenta;
  }

  enviarTransferencia(): void {
    this.transferencia.monto = this.montoTransferencia;

    const data = {
      nombre: this.transferencia.nombre,
      rut: this.transferencia.rut,
      banco: this.transferencia.banco,
      tipo: this.transferencia.tipo,
      monto: this.transferencia.monto
    };

    this.transferenciaService.create(data).subscribe(response => {
      this.submitted = true;
    },
      error => {
      });

    this.submitted = true;
  }

  nuevaTransferencia(): void {
    this.submitted = false;
    this.transferencia = {
      nombre: '',
      rut: '',
      banco: '',
      tipo: '',
      monto: null
    }
    this.montoTransferencia = null;
    this.seleccionado = false;
    this.destinatario = {
      rut: '',
      nombre: '',
      correo: '',
      telefono: null,
      banco: '',
      tipoCuenta: '',
      numeroCuenta: null
    }
  }
}
