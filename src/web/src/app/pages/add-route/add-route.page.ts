import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WallTemplateService } from '../../services/wall-template.service';
import { Hold, HoldType, WallTemplate } from '../../models/wall-template';
import { PinchZoomComponent } from '@meddv/ngx-pinch-zoom';
import { RouteService } from '../../services/route.service';
import { RouteStyle, RouteType } from '../../models/route'
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.page.html',
  styleUrls: ['./add-route.page.scss'],
})
export class AddRoutePage implements OnInit {

   @ViewChild('canvas', { static: true }) canvas!: ElementRef;
   @ViewChild('zoom', { static: true }) zoom!: PinchZoomComponent;

   formGroup!: FormGroup; // declare it here

   public template: WallTemplate | null = null;
   @Output() public holds: Hold[] = [];
   private _selectedHold: Hold | null = null;

   @Output() public routeStyles: RouteStyle[] = [ RouteStyle.FeetFollow, RouteStyle.OpenFeet, RouteStyle.NoMatches ];
   @Output() public routeTypes: RouteType[] = [ RouteType.Boulder, RouteType.Route ];
   @Output() public difficulties: Map<number, string> = new Map<number, string>();


   constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private formBuilder: FormBuilder, private router: Router) {
     this.setDifficulty(routeService.boulderDifficulty);
     this.formGroup = formBuilder.group({
      routeType: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      name: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      description: [
        "",
        Validators.compose([
        ])
      ],
      selectedDifficulty: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      angle: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      routeStyle: [
        "",
        Validators.compose([
          Validators.required
        ])
      ]
    }, { validators: this.selectHoldsValidator });
   }

   selectHoldsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      return this.holds.length > 1 ? null : { missingHolds: true };
   }

   async ngOnInit() {
     const canvas: HTMLCanvasElement = this.canvas.nativeElement;
     this.wallTemplateService.drawTemplateBackdrop(canvas);

     this.template = await this.wallTemplateService.getTemplate();

     let angle = this.template?.Angles[0];
     if (this.template?.Angles.length ?? 0 > 1) {
      angle = this.template?.Angles[this.template.Angles.length / 2] ?? 40;
     }

     this.formGroup = this.formBuilder.group({
       name: ["", Validators.required],
       routeType: [RouteType.Boulder, Validators.required],
       selectedDifficulty: ["", Validators.required],
       angle: [angle, Validators.required],
       routeStyle: [RouteStyle.FeetFollow, Validators.required]
     }, { validators: this.selectHoldsValidator });
   }

   async onSubmit(formData: any) {
      console.log(formData);
      this.router.navigateByUrl('/routes', {replaceUrl: true });
   }

   async selectHold(hold: Hold) {
     this._selectedHold = hold;

     const canvas: HTMLCanvasElement = this.canvas.nativeElement;
     await this.wallTemplateService.drawTemplateBackdrop(canvas);
     await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
   }

   async changeRouteType(event: any) {
     const routeType = event.detail.value;

     if (routeType === RouteType.Route) {
       this.setDifficulty(this.routeService.routeDifficulty);
     } else if (routeType === RouteType.Boulder) {
       this.setDifficulty(this.routeService.boulderDifficulty);
     }
   }

   async setDifficulty(source: Map<number, string>) {
     this.difficulties.clear();

     for (let [key, value] of source) {
       this.difficulties.set(key, value);
     }
   }

   async changeTypeStartingHold(hold: Hold) {
     await this.changeType(hold, HoldType.StartingHold);
   }
   async changeTypeFinishingHold(hold: Hold) {
     await this.changeType(hold, HoldType.FinishingHold);
   }
   async changeTypeFootHold(hold: Hold) {
     await this.changeType(hold, HoldType.FootHold);
   }
   async changeTypeRegularHold(hold: Hold) {
     await this.changeType(hold, HoldType.Hold);
   }
   async changeType(hold: Hold, type: HoldType) {
     hold.Type = type;

     const canvas: HTMLCanvasElement = this.canvas.nativeElement;
     await this.wallTemplateService.drawTemplateBackdrop(canvas);
     await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
   }

   async templateClick(event: any) {
     const ratio = Math.min(this.wallTemplateService.width / event.target.offsetWidth, this.wallTemplateService.height / event.target.offsetHeight);

     const x = (event.layerX + (event.target.offsetWidth - event.target.parentElement.clientWidth) / 2) * ratio;
     const y = (event.layerY + (event.target.offsetHeight - event.target.parentElement.clientHeight) / 2) * ratio
     const hold = await this.wallTemplateService.findHold(x, y);

     if (hold) {

       if (this.holds.length == 0) {
         hold.Type = HoldType.StartingHold;
       } else {
         hold.Type = HoldType.Hold;
       }

       if (!this.holds.includes(hold)) {
         this.holds.push(hold);
       } else {
         let index = this.holds.indexOf(hold);
         this.holds.splice(index, 1);
       }
     }

     const canvas: HTMLCanvasElement = this.canvas.nativeElement;
     await this.wallTemplateService.drawTemplateBackdrop(canvas);
     await this.wallTemplateService.markHolds(this.holds, this._selectedHold, canvas);
     // force re-validation
     this.formGroup.controls['routeStyle'].updateValueAndValidity();
   }

}
