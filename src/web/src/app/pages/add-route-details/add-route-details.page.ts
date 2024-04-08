import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteStyle, RouteType } from 'src/app/models/route';
import { WallTemplate } from 'src/app/models/wall-template';
import { RouteService } from 'src/app/services/route.service';
import { WallTemplateService } from 'src/app/services/wall-template.service';

@Component({
  selector: 'app-add-route-details',
  templateUrl: './add-route-details.page.html',
  styleUrls: ['./add-route-details.page.scss'],
})
export class AddRouteDetailsPage implements OnInit {

  formGroup!: FormGroup; // declare it here
  public template: WallTemplate | null = null;

  @Output() public routeStyles: RouteStyle[] = [RouteStyle.FeetFollow, RouteStyle.OpenFeet, RouteStyle.NoMatches];
  @Output() public routeTypes: RouteType[] = [RouteType.Boulder, RouteType.Route];
  @Output() public difficulties: Map<number, string> = new Map<number, string>();


  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroup = formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      routeType: [RouteType.Boulder, Validators.required],
      difficulty: ["", Validators.required],
      routeStyle: [RouteStyle.FeetFollow, Validators.required]
    });
  }

  async ngOnInit() {
    this.template = await this.wallTemplateService.getTemplate();
    this.setDifficulty(this.routeService.boulderDifficulty);
    if (!this.routeService.holdBuffer || this.routeService.holdBuffer.length < 2) {
      // show error redirect
    }

    let angle = this.template?.Angles[0];
    if (this.template?.Angles.length ?? 0 > 1) {
      angle = this.template?.Angles[this.template.Angles.length / 2] ?? 40;
    }

    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      routeType: [RouteType.Boulder, Validators.required],
      difficulty: ["", Validators.required],
      angle: [angle, Validators.required],
      routeStyle: [RouteStyle.FeetFollow, Validators.required]
    });
  }

  async onSubmit(formData: any) {
    const routeId = await this.routeService.create(
      formData.routeType,
      formData.name,
      formData.description,
      formData.difficulty,
      formData.angle,
      formData.routeStyle,
      this.routeService.holdBuffer);

    await this.routeService.getAll(true);

    this.router.navigateByUrl('/routes/' + routeId, { replaceUrl: true });
  }

  async setDifficulty(source: Map<number, string>) {
    this.difficulties.clear();

    for (let [key, value] of source) {
      this.difficulties.set(key, value);
    }
  }

  async changeRouteType(event: any) {
    const routeType = event.detail.value;

    if (routeType === RouteType.Route) {
      this.setDifficulty(this.routeService.routeDifficulty);
    } else if (routeType === RouteType.Boulder) {
      this.setDifficulty(this.routeService.boulderDifficulty);
    }
  }

}
