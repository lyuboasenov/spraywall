import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Routes', url: '/routes', icon: 'reorder-four' },
    { title: 'Add route', url: '/routes/add', icon: 'add' },
  ];
  public labels = ['Feet follow', 'Open feet', 'No matches'];
  public environment = environment;
  constructor() {}
}
