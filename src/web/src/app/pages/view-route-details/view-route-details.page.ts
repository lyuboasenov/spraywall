import { OverlayEventDetail } from '@ionic/core/components';
import { Component, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Route } from 'src/app/models/route/route';
import { RouteType } from 'src/app/models/route/route-type';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-view-route-details',
  templateUrl: './view-route-details.page.html',
  styleUrls: ['./view-route-details.page.scss'],
})
export class ViewRouteDetailsPage implements OnInit {
  @Input() user: any | null = null;

  private activatedRoute = inject(ActivatedRoute);

   public route?: Route;
   public id!: string;
   public parent_id!: string;

   @ViewChild(IonModal) modal!: IonModal;
   public isSendModalOpen: boolean = false;
   public comment?: string;
   public sendDifficulty?: number;
   public rating?: number;
   @Output() public difficulties: Map<number, string> = new Map<number, string>();

  constructor(private routeService: RouteService, private router: Router, private auth: AuthService) { }

  async ngOnInit() {
    this.auth.user.subscribe(next => {
      this.user = next;
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    const route = await this.routeService.getById(this.id);

    this.difficulties.clear();
    if (route?.RouteType == RouteType.Boulder) {
      this.difficulties = this.routeService.boulderDifficulty;
    } else if (route?.RouteType == RouteType.Route) {
      this.difficulties = this.routeService.routeDifficulty;
    }
    this.sendDifficulty = route?.DifficultyNumber;

    if (route) {
      this.route = route;
      this.parent_id = this.route?.ParentId ?? this.route?.Id;
    } else {
      this.router.navigateByUrl('/not-found')
    }
  }

  async openSendModal() {
    this.isSendModalOpen = true;
  }

  async send() {
    await this.modal.dismiss('ok', 'send');
  }

  async close() {
    await this.modal.dismiss(null, 'close');
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'send') {
      await this.routeService.logSend(this.route?.Id, this.comment, this.sendDifficulty, this.rating);
    }
    this.isSendModalOpen = false;
  }
}
