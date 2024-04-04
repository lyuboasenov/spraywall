import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService, User } from './services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
   @Input() user: null | User = null;

   public appPages = [
    { title: 'Routes', url: '/routes', icon: 'reorder-four' },
    { title: 'Add route', url: '/routes/add', icon: 'add' },
  ];
  public labels = ['Feet follow', 'Open feet', 'No matches'];
  public environment = environment;

  constructor(private auth: AuthService) { }
   async ngOnInit() {
      this.auth.getUser().subscribe(next => {
        this.user = next;
      });
   }
}
