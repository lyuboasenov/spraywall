import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route/route';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-view-route-details',
  templateUrl: './view-route-details.page.html',
  styleUrls: ['./view-route-details.page.scss'],
})
export class ViewRouteDetailsPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

   public route?: Route;
   public id!: string;

  constructor(private routeService: RouteService, private router: Router) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const route = await this.routeService.getById(this.id);

    if (route) {
      this.route = route;
    } else {
      this.router.navigateByUrl('/not-found', { replaceUrl: true })
    }
  }

}
