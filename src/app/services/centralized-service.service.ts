import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentralizedServiceService {
  private sharedData = {
    presupuesto: 0,
    gastos: 0,
    total: 0,
    salidas: false,
    registros: []
  };

  constructor() { }

  getSharedData(){
    return this.sharedData
  }

  updateSharedData(data: any){
    this.sharedData = {...this.sharedData, ...data};
  }
}
