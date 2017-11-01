import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-cell',
  templateUrl: './application-cell.component.html',
  styleUrls: ['./application-cell.component.css']
})
export class ApplicationCellComponent {

	@Input() app: any;

}
