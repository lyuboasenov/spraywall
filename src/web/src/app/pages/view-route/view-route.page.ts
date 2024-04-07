import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route';
import { WallTemplateService } from '../../services/wall-template.service';
import { Hold } from '../../models/wall-template';
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

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private router: Router) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const route = await this.routeService.getById(this.id);

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);

    if (route) {
      this.route = route;

      await this.markHolds();
      setTimeout(() => this.zoomToRoute(), 100);
    } else {
      this.router.navigateByUrl('not-found', { replaceUrl: true })
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

      const initialScale = Math.min(maxWidth / zoomContainer.clientWidth, maxHeight / zoomContainer.clientHeight);
      const scale = Math.min(maxWidth / routeWidth, maxHeight / routeHeight);

      const routeCenter = { x: ( minX + routeWidth / 2) * scale * initialScale, y: ( minY + routeHeight / 2) * scale * initialScale };
      const containerCenter = { x: zoomContainer.clientWidth / 2, y: zoomContainer.clientHeight / 2};

      this.zoom.toggleZoom();
      //this.zoom.pinchZoom.scale = scale;
      this.handlePan(this.zoom.pinchZoom, containerCenter, routeCenter);
    }
  }

  // from ivypinch.ts
  handlePan = (pinchZoom: any, start: { x:number, y:number }, end: { x:number, y:number }) => {
    if (pinchZoom.scale < pinchZoom.minPanScale || pinchZoom.properties.disablePan) {
        return;
    }

    const { clientX, clientY } = { clientX: start.x, clientY: start.y }

    if (!pinchZoom.eventType) {
      pinchZoom.startX = clientX; // - pinchZoom.elementPosition.left;
      pinchZoom.startY = clientY; // - pinchZoom.elementPosition.top;
    }

    pinchZoom.eventType = 'pan';
    pinchZoom.moveX = pinchZoom.initialMoveX + (end.x - pinchZoom.startX);
    pinchZoom.moveY = pinchZoom.initialMoveY + (end.y - pinchZoom.startY);

    if (pinchZoom.properties.limitPan) {
      pinchZoom.limitPanY();
      pinchZoom.limitPanX();
    }

    /* mousemove */
    //if (event.type === 'mousemove' && pinchZoom.scale > pinchZoom.minPanScale) {
    if (pinchZoom.scale > pinchZoom.minPanScale) {
      pinchZoom.centeringImage();
    }

    pinchZoom.transformElement(0);
};

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
