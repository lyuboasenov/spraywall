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
  @ViewChild('zoom', { static: true }) zoom!: ElementRef;

  public template: WallTemplate | null = null;
  private selectedHolds: Hold[] = [];
  public max_zoom = 10;

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {
    this.wallTemplateService.getTemplate().then((template: WallTemplate | null) => {
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;
      this.wallTemplateService.drawTemplateBackdrop(canvas);
    });
  }

  ngOnInit() {
    console.log("OnInit");
    // console.log(this.zoom);
    // this.zoom_height = this.zoom.nativeElement.offsetWidth;
  }

  async templateClick(event: any) {
    let ratio = Math.min(this.wallTemplateService.width / event.target.offsetWidth, this.wallTemplateService.height / event.target.offsetHeight);
    let holds = await this.wallTemplateService.findHold(event.layerX * ratio, event.layerY * ratio);

    if (holds) {
      if (!this.selectedHolds.includes(holds)) {
        this.selectedHolds.push(holds);
      } else {
        let index = this.selectedHolds.indexOf(holds);
        this.selectedHolds.splice(index, 1);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    await this.wallTemplateService.drawTemplateBackdrop(canvas);
    await this.wallTemplateService.markHolds(this.selectedHolds, canvas);
  }
}
