import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() user: any | null = null;

  public appPages = [
    { title: 'Gyms', url: '/gyms', icon: 'reorder-four' },
  ];
  public labels = ['Feet follow', 'Open feet', 'No matches'];
  public environment = environment;

  constructor(private auth: AuthService) { }
  async ngOnInit() {
    this.auth.user.subscribe(next => {
      this.user = next;
    });
 }
}
