import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BouldersService } from '../boulders.service';
import { Boulder } from '../boulder';
import { WallTemplateService } from '../wall-template.service';
import { RotatedRect, WallTemplate } from '../wall-template';

@Component({
  selector: 'app-boulder',
  templateUrl: './boulder.page.html',
  styleUrls: ['./boulder.page.scss'],
})
export class BoulderPage implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  public template: WallTemplate | null = null;
  public id!: string;
  public boulders: Boulder[] = [];
  public boulder?: Boulder;
  private activatedRoute = inject(ActivatedRoute);
  private img = new Image();
  public rating = new Array(0);
  public max_zoom = 10;

  constructor(private bouldersService: BouldersService, private wallTemplateService: WallTemplateService) {
    this.bouldersService.getAll().then((boulders: Boulder[]) => {
      this.boulders = boulders;
      this.selectBoulder();
    });

    this.wallTemplateService.load().then((template: WallTemplate) => {
      this.template = template;
      var _this = this;
      this.img.onload = function() {
        const canvas: HTMLCanvasElement = _this.canvas.nativeElement;

        canvas.width = _this.img.width;
        canvas.height = _this.img.height;

        _this.drawTemplateBackdrop();
        _this.markHolds();
      };

      if (this.template?.EncodedImage) {
        this.img.src = "data:image/jpeg;base64, " + this.template?.EncodedImage;
      }
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.selectBoulder();
  }

  selectBoulder() {
    if (this.id && this.boulders) {
      for (const b of this.boulders) {
        if(this.id === b.Id) {
          this.boulder = b;
          this.rating = new Array(b.Rating);
          this.markHolds();
        }
      }
    }
  }

  markHolds() {
    let holds: RotatedRect[] = [];
    for(const h of this.boulder?.Holds ?? []) {
      const r = this.findSmallestClickedRegion(h.X, h.Y);
      if (r) {
        holds.push(r);
      }
    }

    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let ctx = canvas.getContext("2d");
    if (ctx) {
      for (const r of holds) {

        ctx.save();

        console.log(r);
        ctx.beginPath();
        ctx.ellipse(
          r.Center.X,
          r.Center.Y,
          r.Size.Width / 2,
          r.Size.Height / 2,
          r.Angle * (Math.PI / 180),
          0,
          2 * Math.PI);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(this.img, 0, 0);
        ctx.restore();
      }
    }
  }

  findSmallestClickedRegion(x: number, y:number): RotatedRect | null {
    if (this.template?.Elllipses != null) {
      let arr = this.template.Elllipses;

      let selectedRegion: RotatedRect | null = null;
      let selectedRegionArea: number | null;

      arr.forEach(r => {
        if (this.regionMatch(x, y, r)) {
          if (null == selectedRegionArea || selectedRegionArea > r.Size.Width * r.Size.Height) {
            selectedRegion = r;
          }
        }
      });

      return selectedRegion;
    }

    return null;
  }

  regionMatch(x: number, y: number, r: RotatedRect) {
    let r1 = r.Size.Width / 2;
    let r2 = r.Size.Height / 2;

    return (r.Center.X - r1 < x) &&
      (r.Center.X + r1 > x) &&
      (r.Center.Y - r2 < y) &&
      (r.Center.Y + r2 > y);
  }

  drawTemplateBackdrop() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;

    var ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.drawImage(this.img, 0, 0);

      ctx.restore();
      ctx.save();
      // convert backdrop to grayscale
      // get image data object
      var imageData = ctx.getImageData(0, 0, this.img.width, this.img.height);

      // get the pixels
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        // calculate the luma value
        let darkenFactor = 0.3;
        var luma = 0.299 * data[i] * darkenFactor + 0.587 * data[i+1] * darkenFactor + 0.114 * data[i+2] * darkenFactor;

        // set it to RGB
        data[i] = Math.round(luma);
        data[i+1] = Math.round(luma);
        data[i+2] = Math.round(luma);
      }

      // put the pixels back onto canvas
      ctx.putImageData(imageData, 0, 0);
      ctx.restore();
    }
  }
}
