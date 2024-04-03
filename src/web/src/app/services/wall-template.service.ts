import { Injectable } from '@angular/core';
import { Hold, RotatedRect, WallTemplate } from '../models/wall-template';

const TEMPLATE_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/template.json2024-04-03T03-15-35.json";
const TEMPLATES_PATH: string = 'templates/template.json';

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  private _template?: WallTemplate;
  private _img = new Image;
  private _imgLoaded = false;
  public width: number = 0;
  public height: number = 0;

  constructor() {
    this._img.onload = (e: any) => {
      this.width = this._img.width;
      this.height = this._img.height;
      this._imgLoaded = true;
    }
  }

  public async getTemplate() : Promise<WallTemplate | null> {
    if (!this._template) {
      const data = await fetch(TEMPLATE_REMOTE_URI);
      this._template = await data.json();
    }

    if (this._template?.EncodedImage) {
      this._img.src = "data:image/jpeg;base64, " + this._template?.EncodedImage;
    }

    return this._template ?? null;
  }

  public markHolds(holds: Hold[] | null, canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");
    if (ctx) {
      for (const r of holds ?? []) {

        ctx.save();

        console.log(r);
        ctx.beginPath();
        ctx.ellipse(
          r.Center.X,
          r.Center.Y,
          r.MinRect.Size.Width / 2,
          r.MinRect.Size.Height / 2,
          r.MinRect.Angle * (Math.PI / 180),
          0,
          2 * Math.PI);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(this._img, 0, 0);
        ctx.restore();
      }
    }
  }

  public async drawTemplateBackdrop(canvas: HTMLCanvasElement): Promise<void> {

    while(!this._imgLoaded) {
      await new Promise(f => setTimeout(f, 500));
    }

    canvas.width = this._img.width;
    canvas.height = this._img.height;

    var ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.drawImage(this._img, 0, 0);

      ctx.restore();
      ctx.save();
      // // convert backdrop to grayscale
      // // get image data object
      var imageData = ctx.getImageData(0, 0, this.width, this.height);

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

  public async findHold(x: number, y:number): Promise<Hold | null> {
    if (this._template?.Holds) {
      let arr = this._template?.Holds;

      let selectedHold: Hold | null = null;
      let selectedHoldArea: number | null;

      arr.forEach(r => {
        if (this.regionMatch(x, y, r.MinRect)) {
          if (null == selectedHoldArea || selectedHoldArea > r.MinRect.Size.Width * r.MinRect.Size.Height) {
            selectedHold = r;
          }
        }
      });

      return selectedHold;
    }

    return null;
  }

  private regionMatch(x: number, y: number, r: RotatedRect) {
    let r1 = r.Size.Width / 2;
    let r2 = r.Size.Height / 2;

    return (r.Center.X - r1 < x) &&
      (r.Center.X + r1 > x) &&
      (r.Center.Y - r2 < y) &&
      (r.Center.Y + r2 > y);
  }
}
