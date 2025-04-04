import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { GymService } from 'src/app/services/gym.service';
import { Gym } from 'src/app/models/gym/gym';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-list-gyms',
  templateUrl: './list-gyms.page.html',
  styleUrls: ['./list-gyms.page.scss'],
})
export class ListGymsPage implements OnInit {
  private loading: any | null;
  public gyms: Gym[] = [];

  constructor(
    private gymService: GymService,
    private loadingCtrl: LoadingController,
    private cd: ChangeDetectorRef,
    private menuService: MenuService) {}

  async ngOnInit() {
    await this.menuService.navigatedToGymsPage();
    await this.showLoading();
  }

  async showLoading() {
    navigator.locks.request('dismiss-loading', async (lock) => {
      if (this.gyms.length == 0){
        this.loading = await this.loadingCtrl.create({
          message: 'Loading gyms...',
        });

        this.loading.present();

        this.gymService.getAll().then((gyms: Gym[]) => {
          this.gyms = gyms;
          this.loading?.dismiss();

          this.cd.markForCheck();
          this.cd.detectChanges();
        });
      }
    });
  }
}
