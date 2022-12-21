import { Component } from '@angular/core';
import { CentralizedServiceService } from 'src/app/services/centralized-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CentralizedServiceService]
})
export class AppComponent {
  title = 'Presupuesto';
  data: any = {
    presupuesto: 0,
    gastos: 0,
    total: 0
  };

  // constructor(private centralizedService: CentralizedServiceService) {}

  get_data(data:any) {
    this.data = data;
    console.log(data);
  }
}
