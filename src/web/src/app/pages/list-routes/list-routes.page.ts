import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { WallTemplate } from 'src/app/models/wall-template/wall-template';
import { WallTemplateService } from 'src/app/services/wall-template.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouteStyle } from 'src/app/models/route/route-style';
import { RouteType } from 'src/app/models/route/route-type';
import { RouteSignature } from 'src/app/models/route/route-signature';

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.page.html',
  styleUrls: ['./list-routes.page.scss'],
})
export class ListRoutesPage implements OnInit {
  private loading: any | null;

  @ViewChild(IonModal) modal!: IonModal;

  @Output() public routeStyles: Map<RouteStyle, string>;
  @Output() public routeTypes: Map<RouteType, string>;
  @Output() public difficulties: Map<number, string> = new Map<number, string>();

  @Input() user: any | null = null;

  public routeStyle?: RouteStyle;
  public routeType?: RouteType;
  public angle?: number;
  public minDifficulty?: number;
  public maxDifficulty?: number;
  public setBy?: string;

  public routes: RouteSignature[] = [];
  public selectedRoute?: RouteSignature;
  public template: WallTemplate | null = null;

  constructor(private routeService: RouteService, private wallTemplateService: WallTemplateService, private auth: AuthService, private loadingCtrl: LoadingController) {
    this.routeTypes = this.routeService.routeTypes;

    this.routeStyles = this.routeService.routeStyles;

    this.routeService.getAll().then((routes: RouteSignature[]) => {
      this.routes = routes;
      if (this.template && this.loading) {
        this.loading.dismiss();
      }
      console.log('routes loaded');
    });
    this.wallTemplateService.getTemplate().then(t => {
      this.template = t;

      if (this.routes && this.loading) {
        this.loading.dismiss();
      }
      console.log('template loaded');
    });

    this.auth.user.subscribe(next => {
      this.user = next;
    });
  }

  async ngOnInit() {
    await this.showLoading();
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
    this.setBy = this.routeService.filter.SetBy;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading routes...',
    });

    this.loading.present();
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
      this.routeService.filter.SetBy = this.setBy;

      this.routes = await this.routeService.getAll();
    } else {
      this.routeService.filter.RouteType = undefined;
      this.routeService.filter.RouteStyle = undefined;
      this.routeService.filter.MinDifficulty = undefined;
      this.routeService.filter.MaxDifficulty = undefined;
      this.routeService.filter.Angle = undefined;
      this.routeService.filter.SetBy = undefined;

      this.routes = await this.routeService.getAll();
    }
  }

}
