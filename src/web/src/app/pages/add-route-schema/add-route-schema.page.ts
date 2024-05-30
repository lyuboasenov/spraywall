import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { HoldType } from 'src/app/models/route/hold-type';
import { RouteHold } from 'src/app/models/wall-template/route-hold';
import { WallTemplate } from 'src/app/models/wall-template/wall-template';
import { RouteService } from 'src/app/services/route.service';
import { WallTemplateService } from 'src/app/services/wall-template.service';

@Component({
  selector: 'app-add-route-schema',
  templateUrl: './add-route-schema.page.html',
  styleUrls: ['./add-route-schema.page.scss'],
})
export class AddRouteSchemaPage implements OnInit {
  private loading: any | null;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;

  public template: WallTemplate | null = null;
  @Output() public holds: RouteHold[] = [];
  private _selectedHold: RouteHold | null = null;

  constructor(private router: Router, private routeService: RouteService, private wallTemplateService: WallTemplateService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.showLoading();
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.drawTemplateBackdrop(canvas);

    this.template = await this.wallTemplateService.getTemplate();

    // reset hold buffer
    this.routeService.holdBuffer = [];
    this.holds = this.routeService.holdBuffer;

    this.loading.dismiss();
  }

  async cancel() {
    this.routeService.holdBuffer = [];
    this.holds = this.routeService.holdBuffer;

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.drawTemplateBackdrop(canvas);

    await this.router.navigateByUrl('/');

  }

  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Loading routes...',
    });

    this.loading.present();
  }

  async templateClick(event: any) {
    const canvasRect = event.target.getBoundingClientRect();

    const ratio = Math.min(this.wallTemplateService.width / canvasRect.width, this.wallTemplateService.height / canvasRect.height);

    const x = (event.clientX - canvasRect.left) * ratio;
    const y = (event.clientY - canvasRect.top) * ratio
    const hold = await this.wallTemplateService.findHold(x, y);

    if (hold) {
      let routeHold: RouteHold | undefined = undefined;
      for (const h of this.holds) {
        if (h.TemplateHold === hold) {
          routeHold = h;
          break;
        }
      }

      if (!routeHold) {
        const routeHold: RouteHold = {
          Type: this.holds.length == 0 ? HoldType.StartingHold : HoldType.Hold,
          TemplateHold: hold
        };
        this.holds.push(routeHold);
        this._selectedHold = routeHold;
      } else {
        // every click on a hold advances the type
        // Hold->Finishing->Foot->Starting->REMOVE

        if (routeHold.Type == HoldType.StartingHold) {
          routeHold.Type = HoldType.Hold;

          let index = this.holds.indexOf(routeHold);
          this.holds.splice(index, 1);
          this._selectedHold = null;
        } else {
          if (routeHold.Type == HoldType.FootHold) {
            routeHold.Type = HoldType.StartingHold;
          } else if (routeHold.Type == HoldType.Hold) {
            routeHold.Type = HoldType.FinishingHold;
          } else if (routeHold.Type == HoldType.FinishingHold) {
            routeHold.Type = HoldType.FootHold;
          }
          this._selectedHold = routeHold;
        }
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
  }

}
