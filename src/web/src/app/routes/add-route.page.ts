import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WallTemplateService } from '../services/wall-template.service';
import { Hold, WallTemplate } from '../models/wall-template';
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
  private holds: Hold[] = [];

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {
  }

  ngOnInit() {
    console.log("OnInit");
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.drawTemplateBackdrop(canvas);
  }

  async templateClick(event: any) {
    let ratio = Math.min(this.wallTemplateService.width / event.target.offsetWidth, this.wallTemplateService.height / event.target.offsetHeight);
    let holds = await this.wallTemplateService.findHold(event.layerX * ratio, event.layerY * ratio);

    if (holds) {
      if (!this.holds.includes(holds)) {
        this.holds.push(holds);
      } else {
        let index = this.holds.indexOf(holds);
        this.holds.splice(index, 1);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.holds, canvas);
  }
}
