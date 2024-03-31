import { Injectable } from '@angular/core';
import { WallTemplate } from './wall-template';
import { HttpClient } from '@angular/common/http';

const TEMPLATE_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/template-1.json";
const TEMPLATES_PATH: string = 'templates/template.json';

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  public async load() : Promise<WallTemplate> {
    const data = await fetch(TEMPLATE_REMOTE_URI);
    return await data.json() ?? null;
  }
}
