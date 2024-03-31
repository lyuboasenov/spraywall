import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Routes', url: '/boulders', icon: 'reorder-four' },
    { title: 'Add route', url: '/boulders/add', icon: 'add' },
  ];
  public labels = ['Feet follow', 'Open feet', 'No matches'];
  constructor() {}
}
