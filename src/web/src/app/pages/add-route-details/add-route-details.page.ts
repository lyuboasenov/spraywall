import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteStyle } from 'src/app/models/route/route-style';
import { RouteType } from 'src/app/models/route/route-type';
import { WallTemplate } from 'src/app/models/wall-template/wall-template';
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

  @Output() public routeStyles: Map<RouteStyle, string>;
  @Output() public routeTypes: Map<RouteType, string>;
  @Output() public difficulties: Map<number, string> = new Map<number, string>();

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private formBuilder: FormBuilder, private router: Router) {
    this.routeTypes = this.routeService.routeTypes;

    this.routeStyles = this.routeService.routeStyles;

    this.formGroup = formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      routeType: [this.routeService.lastRouteType, Validators.required],
      difficulty: [this.routeService.lastRouteDifficulty, Validators.required],
      angle: [this.routeService.lastRouteAngle, Validators.required],
      routeStyle: [this.routeService.lastRouteStyle, Validators.required]
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
      routeType: [this.routeService.lastRouteType, Validators.required],
      difficulty: [this.routeService.lastRouteDifficulty, Validators.required],
      angle: [this.routeService.lastRouteAngle, Validators.required],
      routeStyle: [this.routeService.lastRouteStyle, Validators.required]
    });
  }

  async onSubmit(formData: any) {

    const interpolateAngles = this.template?.Angles ?? [];

    const routeId = await this.routeService.create(
      this.template?.Id ?? 'missing',
      formData.routeType,
      formData.name,
      formData.description,
      formData.difficulty,
      Number(formData.angle),
      formData.routeStyle,
      this.routeService.holdBuffer,
      interpolateAngles);

    await this.router.navigate(['/routes', { id: routeId  }]);
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
