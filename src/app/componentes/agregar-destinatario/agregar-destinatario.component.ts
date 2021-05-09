import { Component, OnInit } from '@angular/core';
import { Destinatario } from 'src/app/modelos/destinatario.model';
import { DestinatarioService } from 'src/app/servicios/destinatario.service';
import { TransferenciaService, Banco, Banks } from 'src/app/servicios/transferencia.service';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.component.html',
  styleUrls: ['./agregar-destinatario.component.css']
})
export class AgregarDestinatarioComponent implements OnInit {

  destinatario: Destinatario = {
    rut: null,
    nombre: null,
    correo: null,
    telefono: null,
    banco: null,
    tipoCuenta: null,
    numeroCuenta: null
  };

  submitted = false;

  rutValido: boolean;
  correoValido: boolean;

  tiposCuenta: Array<string> = ["Cuenta Vista", "Cuenta Corriente"];
  bancos: Banks;

  camposValidos: boolean = true;

  placeholder = "ej: 11111111-1";

  msjError: boolean;

  constructor(private destinatarioService: DestinatarioService, private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.msjError = false;
    this.transferenciaService.getBancos().subscribe(bancos => this.bancos = bancos);
  }

  guardarDestinatario(): void {
    if (this.destinatario.rut && this.destinatario.nombre && this.destinatario.telefono &&
      this.destinatario.correo && this.destinatario.banco && this.destinatario.tipoCuenta &&
      this.destinatario.numeroCuenta && this.rutValido && this.correoValido) {
        this.destinatario.rut = this.destinatario.rut.replace(/\./g, "");
      this.camposValidos = true;
      const data = {
        rut: this.destinatario.rut,
        nombre: this.destinatario.nombre,
        correo: this.destinatario.correo,
        telefono: this.destinatario.telefono,
        banco: this.destinatario.banco,
        tipoCuenta: this.destinatario.tipoCuenta,
        numeroCuenta: this.destinatario.numeroCuenta
      };

      this.destinatarioService.create(data).subscribe(response => {
        this.submitted = true;
      },
        error => {
          this.msjError = true;
        });
    } else {
      this.camposValidos = false;
    }

  }

  nuevoDestinatario(): void {
    this.submitted = false;
    this.destinatario = {
      rut: null,
      nombre: null,
      correo: null,
      telefono: null,
      banco: null,
      tipoCuenta: null,
      numeroCuenta: null
    };
  }

  validarRut(rut: string): boolean {
    if(!rut) {
      return false;
    }
    rut = rut.replace(/\./g, "");
    rut = rut.replace(/\-/g, "");

    if (rut.substring(0, rut.length - 1).match("[0-9]+") && rut.length > 2) {
      let vrut: string = rut.substring(0, rut.length - 1);
      let vverificador: string = rut.substring(rut.length - 1);

      let flag: boolean = false;
      let rutAux: string = vrut.trim();

      let posibleVerificador: string = vverificador.trim();
      let cantidad = rutAux.length;
      let factor = 2;
      let suma = 0;
      let verificador: string = "";

      for (let i = cantidad; i > 0; i--) {
        if (factor > 7) {
          factor = 2;
        }
        let sub = +rutAux.substring((i - 1), i);
        suma += sub * factor;
        factor++;

      }
      verificador = (11 - suma % 11).toString();
      if (verificador === posibleVerificador) {
        flag = true;
      } else {
        if ((verificador === "10") && (posibleVerificador.toLowerCase() === "k")) {
          flag = true;
        } else {
          if (verificador === "11" && posibleVerificador === "0") {
            flag = true;
          } else {
            flag = false;
          }
        }
      }

      if (flag) {
        this.rutValido = true;
        rut = vrut + "-" + vverificador;
        rut = rut.substring(0,
          rut.length - 5) + "."
          + rut.substring(rut.length - 5);

        if (rut.length > 9) {
          rut = rut.substring(0,
            rut.length - 9) + "."
            + rut.substring(rut.length - 9);
        }
        this.destinatario.rut = rut;

      } else {
        this.rutValido = false;
      }
      return flag;
    } else {
      this.rutValido = false;
      return false;
    }
  }

  validarEmail(): void {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.destinatario.correo).toLowerCase())) {
      this.correoValido = true;
    } else {
      this.correoValido = false;
    }
  }
}
