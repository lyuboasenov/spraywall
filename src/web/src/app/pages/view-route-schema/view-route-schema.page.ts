import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { Route } from 'src/app/models/route';
import { Hold } from 'src/app/models/wall-template';
import { RouteService } from 'src/app/services/route.service';
import { WallTemplateService } from 'src/app/services/wall-template.service';

@Component({
  selector: 'app-view-route-schema',
  templateUrl: './view-route-schema.page.html',
  styleUrls: ['./view-route-schema.page.scss'],
})
export class ViewRouteSchemaPage implements OnInit {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;
  @ViewChild('zoomContainer', { static: true }) zoomContainer!: ElementRef;

  private activatedRoute = inject(ActivatedRoute);
  private _discoveredHolds: Hold[] = [];

   public route?: Route;
   public id!: string;

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
      this.router.navigateByUrl('/not-found', { replaceUrl: true })
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

      const initialScale = Math.max(maxWidth / zoomContainer.clientWidth, maxHeight / zoomContainer.clientHeight);

      let scale = Math.min(maxWidth / routeWidth, maxHeight / routeHeight);
      // todo set the scale as well
      //this.zoom.pinchZoom.scale = scale;
      this.zoom.toggleZoom();
      scale = this.zoom.pinchZoom.scale;

      let routeCenter = { x: ((minX + maxX) * scale) / (2 * initialScale), y: ((minY + maxY) * scale) / (2 * initialScale) };
      const templateCenter = { x: ((maxWidth) * scale) / (2 * initialScale),y: ((routeHeight) * scale) / (2 * initialScale) }

      this.handlePan(this.zoom.pinchZoom, routeCenter, templateCenter);
    }
  }

  // from ivypinch.ts
  handlePan = (pinchZoom: any, start: { x:number, y:number }, end: { x:number, y:number }) => {
    if (pinchZoom.scale < pinchZoom.minPanScale || pinchZoom.properties.disablePan) {
        return;
    }

    // if (!pinchZoom.eventType) {
      pinchZoom.startX = start.x; // - pinchZoom.elementPosition.left;
      pinchZoom.startY = start.y; // - pinchZoom.elementPosition.top;
    // }

    pinchZoom.eventType = 'pan';
    pinchZoom.moveX = pinchZoom.initialMoveX + (end.x - start.x);
    pinchZoom.moveY = pinchZoom.initialMoveY + (end.y - start.y);

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