import { Injectable } from '@angular/core';
import { WallTemplate } from './wall-template';
import { HttpClient } from '@angular/common/http';

const TEMPLATE_REMOTE_URI: string = "https://storage.googleapis.com/spraywall/balkan/template-draft-2.json";
const TEMPLATES_PATH: string = 'templates/template.json';

@Injectable({
  providedIn: 'root'
})
export class WallTemplateService {
  public wallTemplate: WallTemplate = new WallTemplate(
    this.http,
    TEMPLATE_REMOTE_URI,
    TEMPLATES_PATH
    );

  constructor(private http: HttpClient) { }

  public async load() {
    await this.wallTemplate.load();
  }
}
