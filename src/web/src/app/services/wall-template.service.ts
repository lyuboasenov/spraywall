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
import { CacheService } from "ionic-cache";

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  private _db: Databases;
  private _collectionId = environment.AppWrite.Collections.Walls; // Wall

  constructor(
    private cache: CacheService,
    private appwrite: AppwriteService) {
    this._db = new Databases(appwrite.client);
    cache.setDefaultTTL(2 * 60 * 60); //set default cache TTL for 2 hour
  }

  public async markHolds(wallId: string, holds: RouteHold[] | null, selectedHold: RouteHold | null, canvas: HTMLCanvasElement) {
    const template = await this.getTemplate(wallId);
    if (template == null) {
      console.error("Unable to get template");
      return;
    }
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
        ctx.drawImage(template.image, 0, 0);
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

  public async drawTemplateBackdrop(wallId: string, canvas: HTMLCanvasElement): Promise<void> {
    const template = await this.getTemplate(wallId);
    if (template == null) {
      console.error("Wall with id '" + wallId + "' not found.");
      return;
    }

    canvas.width = template.image?.width ?? 0;
    canvas.height = template.image?.height ?? 0;

    var ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.save();
      ctx.drawImage(template.image, 0, 0);

      ctx.restore();
      ctx.save();
      // // convert backdrop to grayscale
      // // get image data object
      var imageData = ctx.getImageData(0, 0, template.width ?? 0, template.height ?? 0);

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

  public async findHold(wallId: string, x: number, y:number): Promise<WallTemplateHold | null> {
    const template = await this.getTemplate(wallId);

    if (template?.holds) {
      let arr = template?.holds;

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

  private transformHolds(holdsArray: any[]): WallTemplateHold[] {
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

  public  async getTemplate(wallId: string) : Promise<WallTemplate | null> {
    // return await this.cachingService.get(wallId, this.getTemplateNoCache) as WallTemplate;
    return await this.cache.getOrSetItem(wallId, () => this.getTemplateNoCache(wallId));
  }

  private static async getTemplateByWall() {
    WallTemplateService.
  }

  private async getTemplateNoCache(wallId: string) : Promise<WallTemplate | null> {
    const wallTemplateData = await this._db.getDocument(
      this.appwrite.DatabaseId,
      this._collectionId,
      wallId);
    const href = wallTemplateData['TemplateURL']

    const data = await fetch(href);
    const rawTemplate = await data.json();

    const template = {
      id: wallId,
      encodedImage: rawTemplate.EncodedImage,
      holds: this.transformHolds(rawTemplate.Holds),
      angles: rawTemplate.Angles,
      image: new Image,
      initialized: false,
      width: 0,
      height: 0
    };

    template.image.src = "data:image/jpeg;base64, " + template?.encodedImage;
    template.image.onload = (e: any) => {
      template.width = template.image.width;
      template.height = template.image.height;
      template.initialized = true;
    }

    while(!template.initialized) {
      // Poor man's sleep
      await new Promise(f => setTimeout(f, 500));
    }

    return template ?? null;
  }
}

