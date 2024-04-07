import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { Route, RouteStyle, RouteType } from '../../models/route';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { WallTemplate } from 'src/app/models/wall-template';
import { WallTemplateService } from 'src/app/services/wall-template.service';

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.page.html',
  styleUrls: ['./list-routes.page.scss'],
})
export class ListRoutesPage implements OnInit {
   @ViewChild(IonModal) modal!: IonModal;

   @Output() public routeStyles: RouteStyle[] = [ RouteStyle.FeetFollow, RouteStyle.OpenFeet, RouteStyle.NoMatches ];
   @Output() public routeTypes: RouteType[] = [ RouteType.Boulder, RouteType.Route ];
   @Output() public difficulties: Map<number, string> = new Map<number, string>();

   @Input() public routeStyle!: RouteStyle;
   @Input() public routeType!: RouteType;
   public minDifficulty!: number;
   public maxDifficulty!: number;
   @Input() public angle!: number;


   public routes: Route[] = [];
   public selectedRoute?: Route;
   public template: WallTemplate | null = null;

   constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService) {
      this.routeService.getAll().then((routes: Route[]) => {
         this.routes = routes;
      });
   }
   async ngOnInit() {
      this.template = await this.wallTemplateService.getTemplate();
      this.difficulties.clear();

     for (let [key, value] of this.routeService.boulderDifficulty) {
      const routeDifficulty: string = this.routeService.routeDifficulty.get(key) ?? 'unknown';
      this.difficulties.set(key, value + '/' + routeDifficulty);
     }

     // load
     const arr = Array.from(this.difficulties.keys());
     this.minDifficulty = arr[0];
     this.maxDifficulty = arr[arr.length - 1];
   }

   onSelect(b: Route) {
      this.selectedRoute = b;
   }

   async onFilter() {

   }

    clear() {
      this.modal.dismiss(null, 'clear');
    }

    close() {
      // this.modal.dismiss(this.name, 'confirm');
      this.modal.dismiss('ok', 'close');
    }

    onWillDismiss(event: Event) {
      const ev = event as CustomEvent<OverlayEventDetail<string>>;
      if (ev.detail.role === 'confirm') {
        // this.message = `Hello, ${ev.detail.data}!`;
      }
    }

}
