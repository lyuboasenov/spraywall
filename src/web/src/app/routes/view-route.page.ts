import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { WallTemplateService } from '../services/wall-template.service';
import { Hold, WallTemplate } from '../models/wall-template';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.page.html',
  styleUrls: ['./view-route.page.scss'],
})
export class ViewRoutePage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  public id!: string;
  public routes: Route[] = [];
  public route?: Route;
  private activatedRoute = inject(ActivatedRoute);

  public rating = new Array(0);
  public max_zoom = 10;

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {
    this.routeService.getAll().then((routes: Route[]) => {
      this.routes = routes;
      this.selectRoute();
    });

    this.wallTemplateService.getTemplate().then((template: WallTemplate | null) => {
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;

      this.wallTemplateService.drawTemplateBackdrop(canvas).then(() => {
         this.markHolds();
      });
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.selectRoute();
  }

  async selectRoute() {
    if (this.id && this.routes) {
      for (const b of this.routes) {
        if(this.id === b.Id) {
          this.route = b;
          this.rating = new Array(b.Rating);
          await this.markHolds();
        }
      }
    }
  }

  private async markHolds() {
    let holds: Hold[] = [];
    for(const h of this.route?.Holds ?? []) {
      const r = await this.wallTemplateService.findHold(h.X, h.Y);
      if (r) {
        holds.push(r);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.markHolds(holds, canvas);
  }
}
