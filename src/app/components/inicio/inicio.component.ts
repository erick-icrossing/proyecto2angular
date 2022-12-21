import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CentralizedServiceService } from 'src/app/services/centralized-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [CentralizedServiceService],
})
export class InicioComponent {
  @ViewChild('newContactForm') addForm!: NgForm;
  @Output() InicioChangeEvent: EventEmitter<any> = new EventEmitter();


  constructor(private centralizedService: CentralizedServiceService) {}

  add_contact() {
    this.centralizedService.updateSharedData(this.addForm.value);
    const data = this.centralizedService.getSharedData();
    data.total = data.presupuesto;
    data.salidas = true;
    this.InicioChangeEvent.emit(this.centralizedService.getSharedData());
  }
}
