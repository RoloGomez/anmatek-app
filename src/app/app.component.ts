import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  log: boolean = false;
  constructor() {
    setTimeout(() => {
      this.log = true;
    }, 2000);
  }
}
