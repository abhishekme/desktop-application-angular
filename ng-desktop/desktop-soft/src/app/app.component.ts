import { Component } from '@angular/core';
import { Constants } from './services/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Constants]
})
export class AppComponent {
  title = 'desktop';

  constructor(public _constant: Constants){

  }
}
