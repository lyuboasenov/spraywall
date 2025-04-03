import { Component, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private activatedRoute = inject(ActivatedRoute);

  formGroup!: FormGroup; // declare it here
  public template: WallTemplate | null = null;
  public id!: string;
  public gymId!: string;
  public wallId!: string;

  @Output() public routeStyles: Map<RouteStyle, string>;
  @Output() public routeTypes: Map<RouteType, string>;
  @Output() public difficulties: Map<number, string> = new Map<number, string>();

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private formBuilder: FormBuilder, private router: Router) {
    this.routeTypes = this.routeService.routeTypes;

    this.routeStyles = this.routeService.routeStyles;

    this.formGroup = formBuilder.group({
      name: ["", Validators.required],
      description: [""],
      routeType: [this.routeService.lastRouteType ?? 0, Validators.required],
      difficulty: [this.routeService.lastRouteDifficulty, Validators.required],
      angle: [this.routeService.lastRouteAngle, Validators.required],
      routeStyle: [this.routeService.lastRouteStyle ?? 0, Validators.required]
    });
  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.gymId = this.activatedRoute.snapshot.paramMap.get('gymId') as string;
    this.wallId = this.activatedRoute.snapshot.paramMap.get('wallId') as string;

    this.template = await this.wallTemplateService.getTemplate(this.wallId);
    this.setDifficulty(this.routeService.boulderDifficulty);
    if (!this.routeService.holdBuffer || this.routeService.holdBuffer.length < 2) {
      // show error redirect
    }

    let angle = 45;
    let isAngledWall = false;
    if (this.template?.angles !== undefined && (this.template?.angles.length ?? 0 > 1)) {
      angle = this.template?.angles[this.template.angles.length / 2] ?? 40;
      true;
    }

    if (this.id) {
      const route = await this.routeService.getById(this.id);

      if (route) {
        this.formGroup = this.formBuilder.group({
          name: [route.Name, Validators.required],
          description: [route.Description],
          routeType: [route.RouteType, Validators.required],
          difficulty: [route.DifficultyNumber, Validators.required],
          angle: new FormControl(route.Angle, isAngledWall ? Validators.required : []),
          routeStyle: [route.Style, Validators.required]
        });
      } else {
        this.formGroup = this.formBuilder.group({
          name: ["", Validators.required],
          description: [""],
          routeType: [this.routeService.lastRouteType ?? 0, Validators.required],
          difficulty: [this.routeService.lastRouteDifficulty, Validators.required],
          angle: new FormControl(this.routeService.lastRouteAngle, isAngledWall ? Validators.required : []),
          routeStyle: [this.routeService.lastRouteStyle ?? 0, Validators.required]
        });
      }
    } else {
      this.formGroup = this.formBuilder.group({
        name: ["", Validators.required],
        description: [""],
        routeType: [this.routeService.lastRouteType ?? 0, Validators.required],
        difficulty: [this.routeService.lastRouteDifficulty ?? 95, Validators.required],
        angle: new FormControl(this.routeService.lastRouteAngle, isAngledWall ? Validators.required : []),
        routeStyle: [this.routeService.lastRouteStyle ?? 0, Validators.required]
      });
    }
  }

  async onSubmit(formData: any) {

    const interpolateAngles = this.template?.angles ?? [];

    let routeId = this.id;
    if (this.id) {
      await this.routeService.update(
        this.id,
        this.template?.id ?? 'missing',
        formData.routeType,
        formData.name,
        formData.description,
        formData.difficulty,
        Number(formData.angle),
        formData.routeStyle,
        this.routeService.holdBuffer,
        interpolateAngles);
    } else {
      routeId = await this.routeService.create(
        this.template?.id ?? 'missing',
        formData.routeType,
        formData.name,
        formData.description,
        formData.difficulty,
        Number(formData.angle),
        formData.routeStyle,
        this.routeService.holdBuffer,
        interpolateAngles);
    }

    this.routeService.holdBuffer = [];

    await this.router.navigateByUrl('/routes/' + routeId);
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
