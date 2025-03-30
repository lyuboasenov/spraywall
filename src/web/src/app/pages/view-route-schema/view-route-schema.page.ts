import { OverlayEventDetail } from '@ionic/core/components';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { Route } from 'src/app/models/route/route';
import { RouteHold } from 'src/app/models/wall-template/route-hold';
import { RouteService } from 'src/app/services/route.service';
import { WallTemplateService } from 'src/app/services/wall-template.service';
import { RouteType } from 'src/app/models/route/route-type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-route-schema',
  templateUrl: './view-route-schema.page.html',
  styleUrls: ['./view-route-schema.page.scss'],
})
export class ViewRouteSchemaPage implements OnInit {
  @Input() user: any | null = null;
  private loading: any | null;

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;
  @ViewChild('zoomContainer', { static: true }) zoomContainer!: ElementRef;

  private activatedRoute = inject(ActivatedRoute);
  private _discoveredHolds: RouteHold[] = [];

  public route?: Route;
  public id!: string;
  public gymId!: string;
  public wallId!: string;
  public parent_id!: string;

  public isSendModalOpen: boolean = false;
  public comment?: string;
  public sendDifficulty?: number;
  public rating?: number;
  @Output() public difficulties: Map<number, string> = new Map<number, string>();

  constructor(
    private routeService: RouteService,
    private wallTemplateService: WallTemplateService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private auth: AuthService) { }

  async ngOnInit() {
    this.auth.user.subscribe(next => {
      this.user = next;
    });

    await this.showLoading();

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.gymId = this.activatedRoute.snapshot.paramMap.get('gymId') as string;
    this.wallId = this.activatedRoute.snapshot.paramMap.get('wallId') as string;
    const route = await this.routeService.getById(this.id);

    this.difficulties.clear();
    if (route?.RouteType == RouteType.Boulder) {
      this.difficulties = this.routeService.boulderDifficulty;
    } else if (route?.RouteType == RouteType.Route) {
      this.difficulties = this.routeService.routeDifficulty;
    }
    this.sendDifficulty = route?.DifficultyNumber;

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(this.wallId, canvas);

    if (route) {
      this.route = route;

      await this.markHolds();
      setTimeout(() => this.zoomToRoute(), 100);
      this.parent_id = this.route?.ParentId ?? this.route?.Id;
    } else {
      this.router.navigateByUrl('/not-found')
    }

    this.loading.dismiss();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading route ...',
    });

    this.loading.present();
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
          if (minX > hold.TemplateHold.Center.X - hold.TemplateHold.Radius) {
            minX = Math.max(0, hold.TemplateHold.Center.X - hold.TemplateHold.Radius);
          }
          if (maxX < hold.TemplateHold.Center.X + hold.TemplateHold.Radius) {
            maxX = Math.min(maxWidth, hold.TemplateHold.Center.X + hold.TemplateHold.Radius);
          }
          if (minY > hold.TemplateHold.Center.Y - hold.TemplateHold.Radius) {
            minY = Math.max(0, hold.TemplateHold.Center.Y - hold.TemplateHold.Radius);
          }
          if (maxY < hold.TemplateHold.Center.Y + hold.TemplateHold.Radius) {
            maxY = Math.min(maxHeight, hold.TemplateHold.Center.Y + hold.TemplateHold.Radius);
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
      const hold = await this.wallTemplateService.findHold(this.wallId, h.Center.X, h.Center.Y);
      if (hold) {
        this._discoveredHolds.push({
          TemplateHold: hold,
          Type: h.Type
        });
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.markHolds(this.wallId, this._discoveredHolds, null, canvas);
  }

  async openSendModal() {
    this.isSendModalOpen = true;
  }

  async send() {
    await this.modal.dismiss('ok', 'send');
  }

  async close() {
    await this.modal.dismiss(null, 'close');
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'send') {
      await this.routeService.logSend(this.route?.Id, this.comment, this.sendDifficulty, this.rating);
    }
    this.isSendModalOpen = false;
  }
}
