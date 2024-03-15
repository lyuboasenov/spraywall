import { Component, OnInit } from '@angular/core';
import { WallTemplateService } from '../wall-template.service';

@Component({
  selector: 'app-add-boulder',
  templateUrl: './add-boulder.page.html',
  styleUrls: ['./add-boulder.page.scss'],
})
export class AddBoulderPage implements OnInit {
  public template?: string | null;

  constructor(private wallTemplateService: WallTemplateService) {}


  async ngOnInit() {
    await this.wallTemplateService.load();

    console.log(this.wallTemplateService.wallTemplate.base64);
    this.template = this.wallTemplateService.wallTemplate.base64;
  }

  templateClick(event: any) {
    console.log("template click");
    console.debug(event);
  }
}
