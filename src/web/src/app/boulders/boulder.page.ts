import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BouldersService } from '../services/boulders.service';
import { Boulder } from '../models/boulder';
import { WallTemplateService } from '../services/wall-template.service';
import { Hold, RotatedRect, WallTemplate } from '../models/wall-template';

@Component({
  selector: 'app-boulder',
  templateUrl: './boulder.page.html',
  styleUrls: ['./boulder.page.scss'],
})
export class BoulderPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  public id!: string;
  public boulders: Boulder[] = [];
  public boulder?: Boulder;
  private activatedRoute = inject(ActivatedRoute);

  public rating = new Array(0);
  public max_zoom = 10;

  constructor(private bouldersService: BouldersService, private wallTemplateService: WallTemplateService) {
    this.bouldersService.getAll().then((boulders: Boulder[]) => {
      this.boulders = boulders;
      this.selectBoulder();
    });

    this.wallTemplateService.getTemplate().then((template: WallTemplate | null) => {
      const canvas: HTMLCanvasElement = this.canvas.nativeElement;

      this.wallTemplateService.drawTemplateBackdrop(canvas).then(() => {
         this.markHolds();
      })
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.selectBoulder();
  }

  async selectBoulder() {
    if (this.id && this.boulders) {
      for (const b of this.boulders) {
        if(this.id === b.Id) {
          this.boulder = b;
          this.rating = new Array(b.Rating);
          await this.markHolds();
        }
      }
    }
  }

  private async markHolds() {
    let holds: Hold[] = [];
    for(const h of this.boulder?.Holds ?? []) {
      const r = await this.wallTemplateService.findHold(h.X, h.Y);
      if (r) {
        holds.push(r);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    this.wallTemplateService.markHolds(holds, canvas);
  }
}
