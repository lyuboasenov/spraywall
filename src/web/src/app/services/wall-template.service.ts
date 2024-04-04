import { Injectable } from '@angular/core';
import { Hold, HoldType, RotatedRect, WallTemplate } from '../models/wall-template';
import { environment } from 'src/environments/environment';

const TEMPLATE_REMOTE_URI: string = environment.api_base_uri + "template.json2024-04-04T19-44-35.json";
const TEMPLATES_PATH: string = 'templates/template.json';

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  private _template?: WallTemplate;
  private _img = new Image;
  private _imgLoaded = false;
  private _templateLoaded = false;
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

  public markHolds(holds: Hold[] | null, selectedHold: Hold | null, canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");
    if (ctx && holds) {
      for (let i = 0; i < holds.length; i++) {
        const r = holds[i];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(r.Contour[0].X, r.Contour[0].Y);
        for (let j = 1; j < r.Contour.length; j++) {
          ctx.lineTo(r.Contour[j].X, r.Contour[j].Y);
        }
        ctx.lineTo(r.Contour[0].X, r.Contour[0].Y);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(this._img, 0, 0);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.Center.X, r.Center.Y, r.Radius + 10, 0, Math.PI * 2, true); // Outer circle
        ctx.closePath();

        ctx.lineWidth = 5;
        if (r.Type == HoldType.StartingHold) {
          ctx.strokeStyle = '#00FF00';
        } else if (r.Type == HoldType.FinishingHold) {
          ctx.strokeStyle = '#FF0000';
        } else if(r.Type == HoldType.FootHold) {
          ctx.strokeStyle = '#ffe066';
        } else {
          ctx.strokeStyle = '#00FFFF';
        }
        ctx.stroke();
        ctx.restore();

        if (r == selectedHold) {
          ctx.save();
        ctx.beginPath();
        ctx.arc(r.Center.X, r.Center.Y, r.Radius + 20, 0, Math.PI * 2, true); // Outer circle
        ctx.closePath();

        ctx.lineWidth = 5;
        if (r.Type == HoldType.StartingHold) {
          ctx.strokeStyle = '#00FF00';
        } else if (r.Type == HoldType.FinishingHold) {
          ctx.strokeStyle = '#FF0000';
        } else if(r.Type == HoldType.FootHold) {
          ctx.strokeStyle = '#ffe066';
        } else {
          ctx.strokeStyle = '#00FFFF';
        }
        ctx.stroke();
        ctx.restore();
        }
      }
    }
  }

  public async drawTemplateBackdrop(canvas: HTMLCanvasElement): Promise<void> {

    if (!this._templateLoaded) {
      await this.getTemplate();
    }

    while(!this._imgLoaded) {
      // Poor man's sleep
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
