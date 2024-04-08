import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { Hold, HoldType, WallTemplate } from 'src/app/models/wall-template';
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
  @Output() public holds: Hold[] = [];
  private _selectedHold: Hold | null = null;

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private loadingCtrl: LoadingController) { }

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

  async showLoading() {
     this.loading = await this.loadingCtrl.create({
      message: 'Loading routes...',
    });

    this.loading.present();
  }

  async selectHold(hold: Hold) {
    this._selectedHold = hold;

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
  }

  async templateClick(event: any) {
    const ratio = Math.min(this.wallTemplateService.width / event.target.offsetWidth, this.wallTemplateService.height / event.target.offsetHeight);

    const x = (event.layerX + (event.target.offsetWidth - event.target.parentElement.clientWidth) / 2) * ratio;
    const y = (event.layerY + (event.target.offsetHeight - event.target.parentElement.clientHeight) / 2) * ratio
    const hold = await this.wallTemplateService.findHold(x, y);

    if (hold) {
      if (!this.holds.includes(hold)) {
        if (this.holds.length == 0) {
          hold.Type = HoldType.StartingHold;
        } else {
          hold.Type = HoldType.Hold;
        }
        this.holds.push(hold);
        this._selectedHold = hold;
      } else {
        // every click on a hold advances the type
        // Starting->Hold->Finishing->Foot->REMOVE

        if (hold.Type == HoldType.FootHold) {
          hold.Type = HoldType.Hold;

          let index = this.holds.indexOf(hold);
          this.holds.splice(index, 1);
          this._selectedHold = null;
        } else {
          if (hold.Type == HoldType.StartingHold) {
            hold.Type = HoldType.Hold;
          } else if (hold.Type == HoldType.Hold) {
            hold.Type = HoldType.FinishingHold;
          } else if (hold.Type == HoldType.FinishingHold) {
            hold.Type = HoldType.FootHold;
          }
          this._selectedHold = hold;
        }
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
  }

}
