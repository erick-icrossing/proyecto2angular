import { Component, Input } from '@angular/core';

type FooterData = {
  presupuesto: number,
  gastos: number,
  total: number
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() presupuesto: number = 0;
  @Input() gastos: number = 0;
  @Input() total: number = 0; 
}
