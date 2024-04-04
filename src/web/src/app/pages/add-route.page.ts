import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WallTemplateService } from '../services/wall-template.service';
import { Hold, HoldType, WallTemplate } from '../models/wall-template';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.page.html',
  styleUrls: ['./add-route.page.scss'],
})
export class AddRoutePage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;

  public template: WallTemplate | null = null;
  public holds: Hold[] = [];

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {
  }

  ngOnInit() {
    console.log("OnInit");
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.drawTemplateBackdrop(canvas);
  }

  async templateClick(event: any) {
    const ratio = Math.min(this.wallTemplateService.width / event.target.offsetWidth, this.wallTemplateService.height / event.target.offsetHeight);

    const x = (event.layerX + (event.target.offsetWidth - event.target.parentElement.clientWidth) / 2) * ratio;
    const y = (event.layerY + (event.target.offsetHeight - event.target.parentElement.clientHeight) / 2) * ratio
    const hold = await this.wallTemplateService.findHold(x, y);

    if (hold) {

      if (this.holds.length == 0) {
        hold.Type = HoldType.StartingHold;
      } else {
        hold.Type = HoldType.Hold;
      }

      if (!this.holds.includes(hold)) {
        this.holds.push(hold);
      } else {
        let index = this.holds.indexOf(hold);
        this.holds.splice(index, 1);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.holds, canvas);
  }
}
