import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { WallTemplateService } from '../services/wall-template.service';
import { Hold } from '../models/wall-template';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.page.html',
  styleUrls: ['./view-route.page.scss'],
})
export class ViewRoutePage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;
  @ViewChild('zoomContainer', { static: true }) zoomContainer!: ElementRef;

  public id!: string;
  public routes: Route[] = [];
  public route?: Route;
  private activatedRoute = inject(ActivatedRoute);
  private _discoveredHolds: Hold[] = [];

  public schemaSize: number = 500;
  public rating = new Array(0);

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const route = await this.routeService.getById(this.id);

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);

    if (route) {
      this.route = route;

      await this.markHolds();
      await this.zoomToRoute();
    } else {
      // 404
    }
  }

  async zoomToRoute() {
    if (this._discoveredHolds && this._discoveredHolds.length > 0) {
      let minX = 60000.0, maxX = 0.0, minY = 60000.0, maxY = 0.0;

      const zoomContainer = HTMLDivElement = this.zoomContainer.nativeElement;
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;

      const maxWidth = canvas.width;
      const maxHeight = canvas.height;

      for (const hold of this._discoveredHolds) {
        if (hold) {
          if (minX > hold.Center.X - hold.Radius) {
            minX = Math.max(0, hold.Center.X - hold.Radius);
          }
          if (maxX < hold.Center.X + hold.Radius) {
            maxX = Math.min(maxWidth, hold.Center.X + hold.Radius);
          }
          if (minY > hold.Center.Y - hold.Radius) {
            minY = Math.max(0, hold.Center.Y - hold.Radius);
          }
          if (maxY < hold.Center.Y + hold.Radius) {
            maxY = Math.min(maxHeight, hold.Center.Y + hold.Radius);
          }
        }
      }

      const routeHeight = maxY - minY;
      const routeWidth = maxX - minX;

      const scale = Math.min(zoomContainer.clientWidth / routeWidth, zoomContainer.clientHeight / routeHeight);
      const moveX = -500;
      const moveY = minY;

      // canvas.style.transition = 'all 1000ms';
      // canvas.style.transform =
      //     'matrix(' + Number(scale) + ', 0, 0, ' + Number(scale) + ', ' + Number(moveX) + ', ' + Number(moveY) + ')';


      this.zoom.zoomControlScale = scale;
      this.zoom.toggleZoom();
    }
  }

  private async markHolds() {
    for (const h of this.route?.Holds ?? []) {
      const hold = await this.wallTemplateService.findHold(h.Center.X, h.Center.Y);
      if (hold) {
        h.Contour = hold.Contour;
        h.MinRect = hold.MinRect;
        h.Radius = hold.Radius;
        this._discoveredHolds.push(h);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.markHolds(this._discoveredHolds, null, canvas);
  }
}
