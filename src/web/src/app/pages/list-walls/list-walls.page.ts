import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Wall } from 'src/app/models/wall/wall';
import { WallService } from 'src/app/services/wall.service';

@Component({
  selector: 'app-list-walls',
  templateUrl: './list-walls.page.html',
  styleUrls: ['./list-walls.page.scss'],
})
export class ListWallsPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  public gymId!: string;
  private loading: any | null;
  public walls: Wall[] = [];

  constructor(
    private wallService: WallService,
    private loadingCtrl: LoadingController,
        private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    this.gymId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    await this.showLoading();
  }

  async showLoading() {
    navigator.locks.request('dismiss-loading', async (lock) => {
        this.loading = await this.loadingCtrl.create({
          message: 'Loading walls...',
        });
        this.loading.present();

        this.wallService.getAll(this.gymId).then((i: Wall[]) => {
          this.walls = i;
          this.loading?.dismiss();

          this.cd.markForCheck();
          this.cd.detectChanges();
        });
      });
  }

}
