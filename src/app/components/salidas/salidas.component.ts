import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

type Registro = {
  nombre: string,
  category: string,
  monto: string
}

type Categoria = {
  valor: string,
  nombre: string
}

import { CentralizedServiceService } from 'src/app/services/centralized-service.service';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css'],
  providers: [CentralizedServiceService]
})
export class SalidasComponent implements OnInit{
  displayedColumns: string[] = ['registro', 'accion'];
  registros: Registro[] = this.centralizedService.getSharedData().registros;
  categorias: Categoria[] = [
    {valor: 'banco', nombre: 'Banco'},
    {valor: 'servicio', nombre: 'Servicio'},
    {valor : 'alquiler', nombre: 'Alquiler'},
    {valor: 'otro', nombre: 'Otro'}
  ];
  data: any = {};

  @ViewChild('newContactForm') addForm!: NgForm;
  @Input() global: any = {};
  @Output() AgregarRegistroEvent: EventEmitter<any> = new EventEmitter();

  constructor(private centralizedService: CentralizedServiceService) {}

  ngOnInit(): void {
    console.log('global', this.global);
    this.centralizedService.updateSharedData(this.global);
    this.data = this.centralizedService.getSharedData();
    this.registros = [...this.data.registros];
  }

  addRegistro() {
    this.registros.push(this.addForm.value);
    let total = this.data.total;
    let gastos = this.data.gastos;
    this.registros.forEach(registro => {
      gastos += parseInt(registro.monto);
      total -= parseInt(registro.monto);
    })
    this.centralizedService.updateSharedData({registros: [...this.registros], total, gastos});
    this.AgregarRegistroEvent.emit(this.centralizedService.getSharedData());
  }

  removeRegistro(registro: Registro) {
    console.log(JSON.stringify(registro));
    let total = this.data.presupuesto;
    let gastos = 0;
    this.registros = this.registros.filter( (reg) => !(reg === registro));
    
    this.registros.forEach(registro => {
      gastos += parseInt(registro.monto);
      total -= parseInt(registro.monto);
    })
    console.log(this.registros);
    this.centralizedService.updateSharedData({registros: [...this.registros], total, gastos});
    this.AgregarRegistroEvent.emit(this.centralizedService.getSharedData()); 
  }

  editRegistro(registro: Registro) {

  }
}
