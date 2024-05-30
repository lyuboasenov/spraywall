import { Injectable } from '@angular/core';
import { WallTemplate } from '../models/wall-template/wall-template';
import { environment } from 'src/environments/environment';
import { Databases } from "appwrite";
import { AppwriteService } from './appwrite.service';
import { RouteHold } from '../models/wall-template/route-hold';
import { HoldType } from '../models/route/hold-type';
import { WallTemplateHold } from '../models/wall-template/wall-template-hold';
import { RotatedRect } from '../models/common/rotated-rect';
import { Point } from '../models/common/point';

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  private _template?: WallTemplate;
  private _img = new Image;
  private _imgLoaded = false;
  private _templateLoaded = false;
  private _db: Databases;

  private _collectionId = environment.AppWrite.Collections.WallTemplates; // Wall

  public width: number = 0;
  public height: number = 0;


  constructor(private appwrite: AppwriteService) {
    this._db = new Databases(appwrite.client);

    this._img.onload = (e: any) => {
      this.width = this._img.width;
      this.height = this._img.height;
      this._imgLoaded = true;
    }

    this.getTemplate();
  }

  public async getTemplate() : Promise<WallTemplate | null> {
    if (!this._template) {
      const wallTemplates = await this._db.listDocuments(this.appwrite.DatabaseId, this._collectionId);
      const wallTemplateId = wallTemplates.documents[0].$id;

      const wallTemplateData = await this._db.getDocument(this.appwrite.DatabaseId, this._collectionId, wallTemplateId);
      const href = wallTemplateData['TemplateURL']

      const data = await fetch(href);
      const rawTemplate = await data.json();

      this._template = {
        Id: wallTemplateId,
        EncodedImage: rawTemplate.EncodedImage,
        Holds: this.TransformHolds(rawTemplate.Holds),
        Angles: rawTemplate.Angles
      };
    }

    if (this._template?.EncodedImage) {
      this._img.src = "data:image/jpeg;base64, " + this._template?.EncodedImage;
    }

    return this._template ?? null;
  }

  public markHolds(holds: RouteHold[] | null, selectedHold: RouteHold | null, canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d");
    if (ctx && holds) {
      for (let i = 0; i < holds.length; i++) {
        const r = holds[i];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(r.TemplateHold.Contour[0].X, r.TemplateHold.Contour[0].Y);
        for (let j = 1; j < r.TemplateHold.Contour.length; j++) {
          ctx.lineTo(r.TemplateHold.Contour[j].X, r.TemplateHold.Contour[j].Y);
        }
        ctx.lineTo(r.TemplateHold.Contour[0].X, r.TemplateHold.Contour[0].Y);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(this._img, 0, 0);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.TemplateHold.Center.X, r.TemplateHold.Center.Y, r.TemplateHold.Radius + 10, 0, Math.PI * 2, true); // Outer circle
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
        ctx.arc(r.TemplateHold.Center.X, r.TemplateHold.Center.Y, r.TemplateHold.Radius + 20, 0, Math.PI * 2, true); // Outer circle
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
        let darkenFactor = 0.6;
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

  public async findHold(x: number, y:number): Promise<WallTemplateHold | null> {
    if (this._template?.Holds) {
      let arr = this._template?.Holds;

      let selectedHold: WallTemplateHold | null = null;
      let selectedHoldDistance: number | null;

      arr.forEach(r => {
        let distanceFromCenter = Math.sqrt(Math.pow(x - r.Center.X, 2) + Math.pow(y - r.Center.Y, 2));
        if (distanceFromCenter < r.Radius) {
          if (null == selectedHoldDistance || selectedHoldDistance > distanceFromCenter) {
            selectedHold = r;
            selectedHoldDistance = distanceFromCenter;
          }
        }
      });

      return selectedHold;
    }

    return null;
  }

  private TransformHolds(holdsArray: any[]): WallTemplateHold[] {
    const result: WallTemplateHold[] = [];
    for (const h of holdsArray) {

      const center: Point = {
        X: h[0][0],
        Y: h[0][1]
      };

      const radius: number = h[1];

      const minRect: RotatedRect = {
        Center: {
          X: h[2][0][0],
          Y: h[2][0][1]
        },
        Size: {
          Width: h[2][1][0],
          Height: h[2][1][1]
        },
        Angle: h[2][2]
      }

      const contour: Point[] = [];
      for (let i = 0; i < h[3].length; i++) {
        contour.push({
          X: h[3][i][0],
          Y: h[3][i][1],
        });
      }

      result.push({
        Center: center,
        MinRect: minRect,
        Contour: contour,
        Radius: radius,
      });
    }
    return result;
  }
}

