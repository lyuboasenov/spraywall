import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { LightRoute, RouteStyle, RouteType } from '../../models/route';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { WallTemplate } from 'src/app/models/wall-template';
import { WallTemplateService } from 'src/app/services/wall-template.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.page.html',
  styleUrls: ['./list-routes.page.scss'],
})
export class ListRoutesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  @Output() public routeStyles: RouteStyle[] = [RouteStyle.FeetFollow, RouteStyle.OpenFeet, RouteStyle.NoMatches];
  @Output() public routeTypes: RouteType[] = [RouteType.Boulder, RouteType.Route];
  @Output() public difficulties: Map<number, string> = new Map<number, string>();

  @Input() user: any | null = null;

  public routeStyle?: RouteStyle;
  public routeType?: RouteType;
  public angle?: number;
  public minDifficulty?: number;
  public maxDifficulty?: number;

  public routes: LightRoute[] = [];
  public selectedRoute?: LightRoute;
  public template: WallTemplate | null = null;

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private auth: AuthService) {
    this.routeService.getAll().then((routes: LightRoute[]) => {
      this.routes = routes;
    });
    this.auth.user.subscribe(next => {
      this.user = next;
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
    this.routeType = this.routeService.filter.RouteType;
    this.routeStyle = this.routeService.filter.RouteStyle;
    this.minDifficulty = this.routeService.filter.MinDifficulty;
    this.maxDifficulty = this.maxDifficulty;
    this.angle = this.routeService.filter.Angle;
  }

  clear() {
    this.modal.dismiss(null, 'clear');
  }

  close() {
    this.modal.dismiss('ok', 'close');
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'close') {

      this.routeService.filter.RouteType = this.routeType;
      this.routeService.filter.RouteStyle = this.routeStyle;
      this.routeService.filter.MinDifficulty = this.minDifficulty;
      this.routeService.filter.MaxDifficulty = this.maxDifficulty;
      this.routeService.filter.Angle = this.angle;

      this.routes = await this.routeService.getAll();
    } else {
      this.routeService.filter.RouteType = undefined;
      this.routeService.filter.RouteStyle = undefined;
      this.routeService.filter.MinDifficulty = undefined;
      this.routeService.filter.MaxDifficulty = undefined;
      this.routeService.filter.Angle = undefined;

      this.routes = await this.routeService.getAll();
    }
  }

}
