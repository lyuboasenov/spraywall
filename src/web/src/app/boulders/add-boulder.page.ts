import { Component, OnInit } from '@angular/core';
import { WallTemplateService } from '../wall-template.service';
import { RawImage } from '../raw-image';

@Component({
  selector: 'app-add-boulder',
  templateUrl: './add-boulder.page.html',
  styleUrls: ['./add-boulder.page.scss'],
})
export class AddBoulderPage implements OnInit {
  public template?: string | null;
  private img = new Image();
  private rawImg?: RawImage;

  constructor(private wallTemplateService: WallTemplateService) {}


  async ngOnInit() {
    await this.wallTemplateService.load();

    console.log(this.wallTemplateService.wallTemplate.base64);
    this.template = this.wallTemplateService.wallTemplate.base64;

    this.rawImg = new RawImage(1, this.wallTemplateService.wallTemplate.base64 as string);
    console.log(this.rawImg);

    // this.img.src = this.wallTemplateService.wallTemplate.base64 as string;
    // this.img.onload = function() {
    //   console.log('IMAGE LOADED');
    //   // that.cx.drawImage(img, 10, 10, 510, 420);
    //   // const imageData = that.cx.getImageData(0, 0, img.width, img.height);
    //   // const isGray = that.isGrayScaleImage(imageData);
    //   // console.log('GRAY IMAGE:', isGray);
    // };
  }

  templateClick(event: any) {
    console.log("template click");
    console.debug(event);
  }
}
